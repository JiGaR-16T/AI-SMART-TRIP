import { create } from "zustand";

export type ToastType = "default" | "success" | "warning" | "danger" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id"> & { id?: string }) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = toast.id || Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      duration: toast.duration ?? 4000,
      type: toast.type ?? "default",
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

// Convenience helper function
export const toast = (options: Omit<ToastItem, "id"> & { id?: string }) => {
  return useToastStore.getState().addToast(options);
};

toast.success = (title: string, description?: string) =>
  useToastStore.getState().addToast({ title, description, type: "success" });

toast.error = (title: string, description?: string) =>
  useToastStore.getState().addToast({ title, description, type: "danger" });

toast.warning = (title: string, description?: string) =>
  useToastStore.getState().addToast({ title, description, type: "warning" });

toast.info = (title: string, description?: string) =>
  useToastStore.getState().addToast({ title, description, type: "info" });
