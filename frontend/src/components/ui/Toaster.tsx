import React from "react";
import { useToastStore, ToastItem } from "@/store/toastStore";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" aria-live="polite" role="region" aria-label="Notifications">
      {toasts.map((item) => (
        <ToastCard key={item.id} item={item} onClose={() => removeToast(item.id)} />
      ))}
    </div>
  );
};

const iconMap = {
  success: <CheckCircle2 size={18} color="var(--color-success-500)" />,
  warning: <AlertTriangle size={18} color="var(--color-warning-500)" />,
  danger: <AlertCircle size={18} color="var(--color-danger-500)" />,
  info: <Info size={18} color="var(--color-primary-500)" />,
  default: <Info size={18} color="var(--color-primary-500)" />,
};

const ToastCard: React.FC<{ item: ToastItem; onClose: () => void }> = ({ item, onClose }) => {
  const type = item.type || "default";

  return (
    <div className={`toast-item toast-${type}`}>
      <div style={{ flexShrink: 0, marginTop: "2px" }}>{iconMap[type]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--color-text)" }}>
          {item.title}
        </div>
        {item.description && (
          <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            {item.description}
          </div>
        )}
        {item.action && (
          <button
            onClick={item.action.onClick}
            style={{
              marginTop: "6px",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              color: "var(--color-primary-600)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {item.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "var(--color-text-muted)",
          padding: "2px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};
