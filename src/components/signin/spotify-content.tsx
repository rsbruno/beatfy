import { SmilleMusic } from "@/assets/svgs/smille-music";

export function SpotifyContent() {
  return (
    <>
      <div>
        <SmilleMusic width="100%" height="100%" />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h6 className="w-4/6 text-center">
          Controle suas músicas favoritas <br />
          <b>BEATFY</b>
          <br /> é o seu gerenciador!
        </h6>
        <small className="text-slate-400 text-[12px] mt-3">
          Entre com a sua conta, e controle suas músicas...
        </small>
      </div>
    </>
  );
}
