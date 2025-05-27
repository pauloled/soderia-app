import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  // Usuario y rol
  usuario: null,
  rol: null,
  login: (usuario, rol) => set({ usuario, rol }),
  logout: () => set({ usuario: null, rol: null, carrito: [] }),

  // Carrito
  carrito: [],
  agregarAlCarrito: (producto) =>
    set((state) => ({ carrito: [...state.carrito, producto] })),

  // Ventas
  ventas: [],
  obtenerVentas: async () => {
    try {
      const res = await axios.get('http://localhost:3000/ventas');
      set({ ventas: res.data });
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    }
  },

  agregarVenta: async (nuevaVenta) => {
    try {
      await axios.post('http://localhost:3000/ventas', nuevaVenta);
      const res = await axios.get('http://localhost:3000/ventas');
      set({ ventas: res.data });
    } catch (error) {
      console.error('Error al agregar venta:', error);
    }
  },

  eliminarVenta: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/ventas/${id}`);
      const res = await axios.get('http://localhost:3000/ventas');
      set({ ventas: res.data });
    } catch (error) {
      console.error('Error al eliminar venta:', error);
    }
  },
}));

export default useStore;