import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Vehicle {
  id: string;
  plateNumber: string;
  brand: string;
  model: string;
  year: string | number;
  color: string;
  type: string;
  registrationDate: string;
  ownerName: string;
  ownerEmail: string;
  city: string;
  region: string;
  vin: string;
  status: string;
}

interface VehiclesState {
  vehicles: Vehicle[];
}

const initialState: VehiclesState = {
  vehicles: [],
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    clearVehicles: (state) => {
      state.vehicles = [];
    },
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload);
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(vehicle => vehicle.id === action.payload.id);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
    },
    deleteVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.payload);
    },
  },
});

export const { setVehicles, clearVehicles, addVehicle, updateVehicle, deleteVehicle } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
