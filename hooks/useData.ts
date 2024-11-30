import { create } from "zustand";

export type DataType = "addImages";

interface DataStore {
  type: DataType | null;
  data: any;
  addImages: (type: DataType, data?: any) => void;
}

export const useData = create<DataStore>((set) => ({
  type: null,
  data: [],
  addImages: (type, data = []) =>
    set((state) => ({
      type,
      data: [...data, ...state.data],
    })),
}));
