/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApprovalsInitialStateType {
  data: {
    step1Info: any;
    step2Info: any;
    step3Info: any;
    step4Info: any;
    step5Info: any;
  };
}

const initialState: ApprovalsInitialStateType = {
  data: {
    step1Info: {
      newJoinerInfo: { enabled: true },
    },
    step2Info: {
      selectedModalData: {},
      selectedManagerInfo: {},
    },
    step3Info: {
      selectedEntitilementData: {
        rows: [],
      },
    },
    step4Info: {},
    step5Info: {},
  },
};

const store = createSlice({
  name: 'approvalsSlice',
  initialState,
  reducers: {
    setStep1Info: (state, action: PayloadAction<any>) => {
      state.data.step1Info = action.payload.data;
    },
    setStep2Info: (state, action: PayloadAction<any>) => {
      state.data.step2Info = action.payload.data;
    },
    setStep3Info: (state, action: PayloadAction<any>) => {
      state.data.step3Info = action.payload.data;
    },
    setStep4Info: (state, action: PayloadAction<any>) => {
      state.data.step4Info = action.payload.data;
    },
    setStep5Info: (state, action: PayloadAction<any>) => {
      state.data.step5Info = action.payload.data;
    },
  },
});

export const {
  setStep1Info,
  setStep2Info,
  setStep3Info,
  setStep4Info,
  setStep5Info,
} = store.actions;

export default store.reducer;
