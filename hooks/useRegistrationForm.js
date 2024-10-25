import { create } from "zustand";

const useRegistrationModel = create((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegistrationModel;
