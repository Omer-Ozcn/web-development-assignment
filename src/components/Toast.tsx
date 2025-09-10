import { useEffect } from "react";

type Props = {
  kind?: "success" | "info" | "warn" | "error";
  message: string;
  onClose?: () => void;
  timeoutMs?: number;
};

const colors: Record<NonNullable<Props["kind"]>, string> = {
  success: "bg-green-600",
  info: "bg-blue-600",
  warn: "bg-amber-600",
  error: "bg-red-600",
};

export default function Toast({ kind = "info", message, onClose, timeoutMs = 1800 }: Props) {
  useEffect(() => {
    if (!onClose) return;
    const id = setTimeout(onClose, timeoutMs);
    return () => clearTimeout(id);
  }, [onClose, timeoutMs]);

  return (
    <div
      role="status"
      className={`fixed left-1/2 top-4 -translate-x-1/2 text-white px-4 py-2 rounded shadow ${colors[kind]} z-50`}
      aria-live="polite"
    >
      {message}
    </div>
  );
}
