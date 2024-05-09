import { Recommendation } from "@/@types/user/recomendations";

export default function ItemRecommendations({ track }: { track: Recommendation }) {
  return (
    <li className="flex items-center justify-center gap-3 w-72 ">
      <div className="min-w-[32px] w-[32px] h-[32px] rounded-[5px] overflow-hidden">
        <img src={track?.album.images?.[2].url} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <strong className="text-white font-medium text-[13px] w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {track.album.name}
        </strong>
        <small className="text-[10px] text-gray-300">
          {track.artists.map((artist) => artist.name).join("|")}
        </small>
      </div>
    </li>
  );
}
