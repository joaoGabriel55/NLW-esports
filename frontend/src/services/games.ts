import { Game } from "../domain/game";
import { API } from "./constants";

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch(`${API}/games`);

  return await response.json();
}
