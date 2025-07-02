import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  customer: string;
  status: string;
  count: number;
  price: number;
  payment: string;
  delivery: string;
  date: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
});

export const { setOrders, clearOrders, addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
