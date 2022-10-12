import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import Input from "./Form/Input";

import { useGames } from "../hooks/useGames";
import WeekDays from "./Form/WeekDays";
import { FormEvent, useState } from "react";
import { Ad } from "../domain/ad";
import { createGameAd } from "../services/createGameAd";

interface Props {
  children: React.ReactNode;
}

export default function PublishAdModal({ children }: Props) {
  const { games } = useGames();

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  function handleUseVoiceChannel(checked: boolean) {
    if (checked) setUseVoiceChannel(true);
    else setUseVoiceChannel(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData) as unknown as Ad & {
      game: string;
    };

    const ad = {
      ...data,
      weekDays: weekDays.map(Number),
      yearsPlaying: Number(data.yearsPlaying),
      useVoiceChannel,
    };

    await createGameAd(
      data.game as string,
      ad,
      () => alert("success!"),
      () => alert("error :-(")
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-32 left-1/2 -translate-x-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">
            Publique um anúncio
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <select
                id="game"
                name="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o game que deseja jogar
                </option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Sou nome (nickname)</label>
              <Input name="name" id="name" placeholder="Digite seu nome" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser Zero"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  name="discord"
                  id="discord"
                  type="text"
                  placeholder="usuario#000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Qual costuma jogar?</label>
                <WeekDays weekDays={weekDays} onValueChange={setWeekDays} />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horario do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>
            <label className="mt-2 flex items-center gap-2">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={handleUseVoiceChannel}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              >
                Cancelar
              </Dialog.Close>
              <button
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                type="submit"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
