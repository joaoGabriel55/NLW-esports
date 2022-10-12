import * as ToggleGroup from "@radix-ui/react-toggle-group";

const weekDayItems = [
  { value: "0", label: "D", title: "Domingo" },
  { value: "1", label: "S", title: "Segunda" },
  { value: "2", label: "T", title: "Terça" },
  { value: "3", label: "Q", title: "Quarta" },
  { value: "4", label: "Q", title: "Quinta" },
  { value: "5", label: "S", title: "Sexta" },
  { value: "6", label: "S", title: "Sábado" },
];

interface Props {
  weekDays: string[];
  onValueChange: (weekDays: string[]) => void;
}

export default function WeekDays({ weekDays, onValueChange }: Props) {
  return (
    <ToggleGroup.Root
      type="multiple"
      className="grid grid-cols-4 gap-2"
      value={weekDays}
      onValueChange={onValueChange}
    >
      {weekDayItems.map(({ value, title, label }) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          title={title}
          className={`w-8 h-8 rounded ${
            weekDays.includes(value) ? "bg-violet-500" : "bg-zinc-900"
          }`}
        >
          {label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
