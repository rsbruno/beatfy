import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
import { spotifyServices } from "./spotify";
import { SpotifyRefreshTokenProps } from "./spotify/refresh-token-spotify";

// Variavel para informar se está acontecendo uma requisição de refresh token
let isRefreshing = false;
// Variavel para armazenar a fila de requisições que falharam por token expirado
let failedRequestQueue: any[] = [];

const cookies = new Cookies();

// Cria as configurações iniciais do Axios
const spotifyAxiosInstance = axios.create({
  baseURL: "https://api.spotify.com/",
  headers: {
    Authorization: `Bearer ${cookies.get("@beatfy:user")?.access_token ?? ""}`,
  },
});

// Cria um interceptor para interceptar todas as requisições que forem feitas
spotifyAxiosInstance.interceptors.response.use(
  (response) => {
    // Se a requisição der sucesso, retorna a resposta
    return response;
  },
  (error: AxiosError) => {
    // Se a requisição der erro, verifica se o erro é de autenticação
    if (error?.response?.status === 401) {
      // Se o erro for de autenticação, verifica se o erro foi de token expirado
      // Recupera o refresh token do localStorage
      const refreshToken = cookies.get("@beatfy:user")?.refresh_token;
      // Recupera toda a requisição que estava sendo feita e deu erro para ser refeita após o refresh token
      const originalConfig = error.config;

      // Verifica se já existe uma request de refreshToken acontecendo
      if (!isRefreshing) {
        // Se não existir, inicia a requisição de refreshToken
        isRefreshing = true;
        // Faz uma requisição de refreshToken
        spotifyServices
          .refreshTokenSpotify(refreshToken)
          .then((response) => {
            const { access_token } = response as SpotifyRefreshTokenProps;
            spotifyAxiosInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
            // Faz todas as requisições que estavam na fila e falharam
            failedRequestQueue.forEach((request) => request.onSuccess(access_token));
            // Limpa a fila de requisições que falharam
            failedRequestQueue = [];
          })
          .catch((err) => {
            console.log(err);
            // Retorna os erros que estão salvos na fila de requisições que falharam
            failedRequestQueue.forEach((request) => request.onFailure(err));
            // Limpa a fila de requisições que falharam
            failedRequestQueue = [];
            // Caso der erro desloga o usuário
          })
          .finally(() => {
            // Indica que a requisição de refreshToken acabou
            isRefreshing = false;
          });
      }

      // Usando a Promise no lugar do async await, para que a requisição seja feita após o refresh token
      return new Promise((resolve, reject) => {
        // Adiciona a requisição na fila de requisições que falharam com as informações necessárias para refazer a requisição novamente
        failedRequestQueue.push({
          // Se a requisição der sucesso, chama o onSuccess
          onSuccess: (token: string) => {
            if (originalConfig) {
              // Adiciona o novo token gerado no refresh token no header de autorização
              originalConfig.headers["Authorization"] = `Bearer ${token}`;

              // Faz a requisição novamente passando as informações originais da requisição que falhou
              resolve(spotifyAxiosInstance(originalConfig));
            }
          },
          // Se a requisição der erro, chama o onFailure
          onFailure: (err: AxiosError) => {
            // Se não for possivel refazer a requisição, retorna o erro
            reject(err);
          },
        });
      });
    } else cookies.remove("@beatfy:user");
  }
);

export { spotifyAxiosInstance };
