type Status = "green" | "yellow" | "blue";

type StatusBadgeProps = {
  status: Status;
};

const STATUS_CONFIG: Record<
  Status,
  { emoji: string; label: string; bg: string; text: string }
> = {
  green: {
    emoji: "🟢",
    label: "実体験",
    bg: "bg-[#E6F4EA]",
    text: "text-[#1B5E20]",
  },
  yellow: {
    emoji: "🟡",
    label: "一部実体験",
    bg: "bg-[#FFF8E1]",
    text: "text-[#7A4F01]",
  },
  blue: {
    emoji: "🔵",
    label: "調査ベース",
    bg: "bg-[#E3F2FD]",
    text: "text-[#0D47A1]",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      role="status"
      aria-label={`情報源: ${cfg.label}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span aria-hidden="true">{cfg.emoji}</span>
      <span>{cfg.label}</span>
    </span>
  );
}
