import { useEffect, useState } from "react";
import { Ad } from "../domain/ad";
import { fetchGameAds } from "../services/ads";

export function useGameAds(gameId: string) {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchGameAds(gameId).then((data) => setAds(data));
  }, []);

  return { ads };
}
