import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  plans: [],
  isLoading: false,
  error: null,
};

export const __updatePlans = createAsyncThunk(
  "plans/updatePans",
  async (payload, thunkAPI) => {
    console.log("payload_update");
    console.log(payload);
    const { id, ...rest } = payload;
    console.log(id);
    console.log("...rest");
    console.log(rest); // 와 ㅅㅂ 뒤질뻔햇네.
    try {
      const data = axios.patch(`http://localhost:3001/plans/${id}`, rest);
      console.log("data?");
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("this2?");
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __createPlans = createAsyncThunk(
  "plans/createPlans",
  async (payload, thunkAPI) => {
    console.log("payload");
    console.log(payload);
    try {
      const data = await axios.post("http://localhost:3001/plans", payload);
      console.log("data?");
      console.log("data.data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("this2?");
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __getPlans = createAsyncThunk(
  "todos/getPlans",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/plans");
      console.log(data); // 잘처리되면 fullfiled
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __deletePlans = createAsyncThunk(
  "todos/deleteTodos",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.delete(
        `http://localhost:3001/plans/${payload.id}`
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: {
    [__getPlans.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPlans.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.plans = action.payload; // Store에 있는 plans에 서버에서 가져온 plans를 넣습니다.
    },
    [__getPlans.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__createPlans.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.plans = state.plans; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__createPlans.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__createPlans.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      console.log("action.payload");
      console.log(action.payload.data);
      state.plans = [...state.plans, action.payload.data];
      console.log(state.plans);
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__deletePlans.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePlans.rejected]: (state) => {
      state.isLoading = false;
      state.plans = state.plans;
    },
    [__deletePlans.fulfilled]: (state) => {
      state.plans = state.plans;
    },
  },
});

export const {} = plansSlice.actions;
export default plansSlice.reducer;
