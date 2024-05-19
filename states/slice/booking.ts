import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  // createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Booking, bookingApi, ggMapApi, mapApi } from "../../api";
import { RootState } from "../store";
interface BookingState
  extends Omit<
    Booking,
    "id" | "userId" | "notes" | "locations" | "status" | "price"
  > {
  id?: number;
  distance?: number;
  notes: number[];
  locations: Pick<
    Booking["locations"][number],
    "address" | "latitude" | "longitude"
  >[];
  status?: Booking["status"];
  price?: number;
}
const initialState: BookingState = {
  locations: [],
  notes: [],
  note: "",
  rating: null,
  startTime: null,
  endTime: null,
  nextLocationId: null,
  driverId: null,
  driver: null,
  createdAt: "",
  updatedAt: "",
};
export const addAdress = createAsyncThunk(
  "booking/addAdress",
  ggMapApi.geoCode,
);
export const addLocation = createAsyncThunk(
  "booking/addLocation",
  async (
    location: Pick<Booking["locations"][number], "latitude" | "longitude">,
  ) => {
    const { latitude, longitude } = location;
    const address = await ggMapApi.geoReverse(latitude, longitude);
    return { ...location, address };
  },
);
export const replaceLocation = createAsyncThunk(
  "booking/replaceLocation",
  async (payload: { index: number; address: string }) => {
    const { index, address } = payload;
    const location = await ggMapApi.geoCode(address);
    return [index, { ...location, address }] as const;
  },
);
export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  bookingApi.cancel,
);
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  (_, thunkApi) => {
    const state = thunkApi.getState() as { booking: BookingState };
    const { id, locations, note, notes, distance } = state.booking;
    if (locations.length < 2 || id || !distance) {
      throw new Error("Invalid booking");
    }
    const [pickup, ...stops] = locations.map((l) => ({
      latitude: l.latitude,
      longitude: l.longitude,
      address: l.address,
    }));
    const dropOff = stops[stops.length - 1];
    stops.pop();
    const booking = {
      distance,
      pickup,
      dropOff,
      stops,
      note,
      notes,
    };
    return bookingApi.create(booking);
  },
);
export const calculatePrice = createAsyncThunk(
  "booking/calculatePrice",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as { booking: BookingState };
    const { locations, distance } = state.booking;
    if (locations.length < 2 || !distance) return 0;
    return mapApi.calculateCost({
      distance,
      numberOfWaypoints: locations.length - 2,
    });
  },
);
export const bookingSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    patchBooking: (
      state,
      action: PayloadAction<Partial<Booking> | undefined>,
    ) => {
      if (!action.payload) return initialState;
      const payload = action.payload;
      const { notes } = payload;
      return {
        ...state,
        ...payload,
        notes: notes ? notes.map((n) => n.id) : [],
      };
    },
    patchDriver: (state, action: PayloadAction<Partial<Booking["driver"]>>) => {
      if (!state.driver) return;
      state.driver = { ...state.driver, ...action.payload };
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations.splice(action.payload, 1);
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    setNotes: (state, action: PayloadAction<number[]>) => {
      state.notes = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addLocation.fulfilled, (state, action) => {
        const { locations } = state;
        return { ...state, locations: [...locations, action.payload] };
      })
      .addCase(addAdress.fulfilled, (state, action) => {
        const { locations } = state;
        return { ...state, locations: [...locations, action.payload] };
      })
      .addCase(replaceLocation.fulfilled, (state, action) => {
        const [index, location] = action.payload;
        state.locations[index] = location;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        const payload = action.payload;
        const { notes } = payload;
        return {
          ...state,
          ...payload,
          notes: notes ? notes.map((n) => n.id) : [],
        };
      })
      .addCase(cancelBooking.fulfilled, (state) => {
        state.status = undefined;
        state.id = undefined;
      })
      .addCase(calculatePrice.fulfilled, (state, action) => {
        state.price = action.payload;
      }),
});
export const selectBooking = (state: RootState) => state.booking;
export const selectLocations = createSelector(
  selectBooking,
  (state) => state.locations,
);

export const {
  patchBooking,
  patchDriver,
  removeLocation,
  setDistance,
  setNote,
  setNotes,
} = bookingSlice.actions;
export default bookingSlice.reducer;
