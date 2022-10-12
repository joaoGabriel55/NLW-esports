import { useEffect, useState } from "react";
import { Game } from "../domain/game";
import { fetchGames } from "../services/games";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames().then((data) => setGames(data));
  }, []);

  return { games };
}
