// src/redux/features/customersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllCustomerDataType } from "../../types";

interface CustomerState {
  customers: AllCustomerDataType[];
}

const initialState: CustomerState = {
  customers: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<AllCustomerDataType[]>) => {
      state.customers = action.payload;
    },
  },
});

export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;
