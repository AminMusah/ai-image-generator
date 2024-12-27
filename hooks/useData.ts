import { create } from "zustand";

export type DataType = "addImages";

interface DataStore {
  type: DataType | null;
  data: any;
  rendering: any;
  addImages: (type: DataType, data?: any) => void;
  onRender: (data: any) => void;
}

export const useData = create<DataStore>((set) => ({
  type: null,
  data: [],
  rendering: null,
  onRender: (data: any) => set((state) => ({ rendering: data })),
  addImages: (type, data = []) =>
    set((state) => ({
      type,
      data: [...state.data, ...data],
    })),
}));
