import { fetchDiscordUser } from "../services/ads";
import { useState } from "react";

export default function useDiscordUser() {
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("");

  async function loadDiscordUser(adsId: string): Promise<void> {
    const discord = await fetchDiscordUser(adsId);
    setDiscordDuoSelected(discord);
  }

  function clearDiscordDuoSelected() {
    setDiscordDuoSelected("");
  }

  return {
    discordDuoSelected,
    loadDiscordUser,
    clearDiscordDuoSelected,
  };
}
