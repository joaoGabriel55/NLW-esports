import { Ad } from "../domain/ad";

export async function fetchGameAds(gameId: string): Promise<Ad[]> {
  const response = await fetch(`http://192.168.0.11:3333/games/${gameId}/ads`);

  return await response.json();
}

export async function fetchDiscordUser(adsId: string): Promise<string> {
  const response = await fetch(`http://192.168.0.11:3333/ads/${adsId}/discord`);
  const result = (await response.json()) as unknown as { discord: string };

  return result.discord;
}
