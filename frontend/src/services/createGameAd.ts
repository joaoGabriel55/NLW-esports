import { Ad } from "../domain/ad";
import axios from "axios";
import { API } from "./constants";
export async function createGameAd(
  gameId: string,
  ad: Ad,
  onSuccess: () => void,
  onError: () => void
) {
  try {
    await axios.post(`${API}/games/${gameId}/ads`, ad);

    onSuccess();
  } catch {
    onError();
  }
}
