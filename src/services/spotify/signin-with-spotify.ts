export const signinWithSpotify = () => {
  try {
    const redirect_uri = import.meta.env.VITE_APP_SPOTIFY_REDIRECT_CALLBACK!,
      spotifyAccount = import.meta.env.VITE_APP_SPOTIFY_API_ACCOUNT!,
      client_id = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID!;

    const scopes = [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-read-private",
      "user-read-email",
      "user-top-read",
    ];

    const searchParams = new URLSearchParams({
      response_type: "code",
      scope: scopes.join(),
      show_dialog: "true",
      redirect_uri,
      client_id,
    });

    return `${spotifyAccount}/authorize?${searchParams.toString()}`;
  } catch (error) {
    throw error;
  }
};
