import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DefLocationType = {
  latitude: any;
  longitude: any;
};

export interface TripState {
  isActive: boolean;
  uuid?: string;
  start?: DefLocationType;
  end?: DefLocationType;
  travelPoints: DefLocationType[];
  startTime: any;
  endTime: any;
}

type stateType = TripState;

type tripStateType = {
  trip: TripState;
};

const initState: TripState = {
  isActive: false,
  travelPoints: [],
  startTime: null,
  endTime: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState: initState,
  reducers: {
    addTrip: (state: stateType, action: PayloadAction<TripState>) => {
      return {
        ...action?.payload,
        startTime: action.payload.startTime || new Date(),
        endTime: null,
      };
    },
    onTripEnd: () => {
      return { ...initState, endTime: new Date(), };
    },
    onAddPoint: (state: stateType, action: PayloadAction<DefLocationType>) => {
      return { ...state, travelPoints: [...state.travelPoints, action.payload] };
    },
  },
});

export const {
  reducer: tripReducer,
  actions: {
    addTrip: stateInitTrip,
    onAddPoint: stateAddTravelPoint,
    onTripEnd: stateEndTrip,
  },
} = tripSlice;

export const stateTrip = (state: tripStateType) => state.trip;
export const stateIsTripActive = (state: tripStateType) =>
  state?.trip?.isActive;
