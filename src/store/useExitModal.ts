import { create } from "zustand";

type ExitModalState = {
  isOpen: boolean;
};

type ExitModalStoreActions = {
  onOpen: () => void;
  onClose: () => void;
};

export const useExitModalStore = create<ExitModalState & ExitModalStoreActions>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
