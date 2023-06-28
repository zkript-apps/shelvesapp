import { T_AUTH, T_AUTH_STORE } from '@/types/global';
import { create } from 'zustand'

const useAuthStore = create<T_AUTH_STORE & T_AUTH>((set) => ({
  email: null,
  role: null,
  updateValues: (state) => set({ email: state.email, role: state.role }),
  resetValues: () => set({ email: null, role: null }),
}))

export default useAuthStore;