import { ErrorFigure } from "@/assets/svgs/error-figure";

export function ErrorContent() {
  return (
    <>
      <div>
        <ErrorFigure width="100%" height="100%" />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <h6 className="w-4/6 text-center">Oh! Não conseguimos autenticar sua conta Spotify!</h6>
        <small className="text-slate-400 text-[12px] mt-3">
          Não se preocupe, a conexão que fazemos no Spotify é segura!
        </small>
      </div>
    </>
  );
}
