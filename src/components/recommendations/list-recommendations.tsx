import { Recommendation } from "@/@types/user/recomendations";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ReactNode } from "react";

interface ListRecommendationsProps {
  recommendations: Recommendation[];
  renderRecommnedation: (track: Recommendation) => ReactNode;
}

export default function ListRecommendations({
  renderRecommnedation,
  recommendations,
}: ListRecommendationsProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col flex-1">
        <h2 className="text-[11px] uppercase underline">Relacionados ao que você está ouvindo</h2>
        <ul className="flex flex-col gap-2 mt-1 max-h-[100px]">
          {recommendations.map((track) => renderRecommnedation(track))}
        </ul>
      </div>
    </ScrollArea>
  );
}
