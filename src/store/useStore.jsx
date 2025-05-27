import { create } from 'zustand'

const useStore = create((set) => ({
  usuario: null,
  carrito: [],
  rol: null,

  login: (usuario, rol) => set({ usuario, rol }),
  logout: () => set({ usuario: null, rol: null, carrito: [] }),
  agregarAlCarrito: (producto) =>
    set((state) => ({ carrito: [...state.carrito, producto] }))
}));

export default useStore;