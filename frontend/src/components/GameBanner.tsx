import React from "react";

interface Props {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export default function GameBanner({ bannerUrl, title, adsCount }: Props) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt={`Game ${title}`} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
      </div>
    </a>
  );
}
