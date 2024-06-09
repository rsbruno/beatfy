import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SpotifyContent } from "./spotify-content";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/ui/loading";
import { SpotifyLogoPNG } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { ErrorContent } from "./error-content";
import { Show } from "../show";

interface DialogLoginProps {
  trySigninWithSpotify: () => Promise<void>;
  isLoading: boolean;
  open: boolean;
}

export function DialogLogin({ open, isLoading, trySigninWithSpotify }: DialogLoginProps) {
  const [searchParams] = useSearchParams();
  return (
    <Dialog open={open}>
      <DialogContent className="!rounded-2xl !border-slate-500">
        <aside className="h-[70vh] rounded-2xl flex flex-col relative overflow-hidden">
          <Loading isLoading={isLoading} />
          <div className="flex-1 flex justify-evenly items-center flex-col">
            <Show>
              <Show.When isTrue={searchParams.has("error")}>
                <ErrorContent />
              </Show.When>
              <Show.Else>
                <SpotifyContent />
              </Show.Else>
            </Show>
          </div>
          <footer className="w-full flex justify-center items-center">
            <Button size="lg" className="rounded-full" onClick={trySigninWithSpotify}>
              <div className="flex gap-3 justify-center items-center">
                <img src={SpotifyLogoPNG} alt="logo spotify" className="size-8 rounded-full" />
                <strong className="font-nunito text-[16px] text-white">
                  {searchParams.has("error") ? "tentar novamente" : "cntrar com Spotify"}
                </strong>
              </div>
            </Button>
          </footer>
        </aside>
      </DialogContent>
    </Dialog>
  );
}
