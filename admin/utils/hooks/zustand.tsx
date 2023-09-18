import create from "zustand";
import { persist } from "zustand/middleware";

import { ZustandStore } from "@/types/Store";

// export const useStore = create((set: any) => ({
//   auth: { accessToken: "", refreshToken: "" },
//   // increasePopulation: (): void =>
//   //   set((state: any) => ({ bears: state.bears + 1 })),
//   login: (data: any): void => set(() => ({ auth: data })),
//   logout: (): void => set({ accessToken: "", refreshToken: "" }),
// }));

export const useStore = create<ZustandStore>(
  persist(
    (set): ZustandStore => ({
      auth: undefined,
      user: undefined,
      progress: 0,
      loading: false,
      setProgress: (data: number): void => set(() => ({ progress: data })),
      login: (data: any): void => set(() => ({ auth: data })),
      setMe: (data: any): void => set(() => ({ user: data })),
      logout: (): void => set({ auth: undefined, user: undefined }),
      setLoading: (loading: boolean): void => set(() => ({ loading })),
    }),
    {
      name: "auth", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
