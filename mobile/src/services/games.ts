import { Game } from "../domain/game";

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch("http://192.168.0.11:3333/games");

  return await response.json();
}
