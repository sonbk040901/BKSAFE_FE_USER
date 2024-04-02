import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Booking, BookingStatus, Driver, ggMapApi } from "../api";
import useCalculateCost from "../api/hook/useCalculateCost";
import useCreateBooking from "../api/hook/useCreateBooking";
import useFindDriver from "../api/hook/useFindDriver";
import useLocation from "../hook/useLocation";
import useCancelBooking from "../api/hook/useCancelBooking";
interface Location {
  address: string;
  latitude: number;
  longitude: number;
}
interface DriverOnMap {
  id: number;
  latitude: number;
  longitude: number;
  distance: number;
}
interface MapContextState {
  currentLocation?: Omit<Location, "address">;
  locations: Location[];
  notes: number[];
  price?: number;
  note: string;
  rating: number | null;
  startTime: string | null;
  endTime: string | null;
  nextLocationId: number | null;
  driverId: number | null;
  driver: Driver | null;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  status?: BookingStatus;
  driverOnMaps: DriverOnMap[];
  viewOnly: boolean;
  addAddress: (address: string) => unknown;
  addLocation: (location: Omit<Location, "address">) => unknown;
  removeLocation: (index: number) => unknown;
  replaceLocation: (index: number, address: string) => unknown;
  setNote: (note: string) => unknown;
  setNotes: (notes: number[]) => unknown;
  setDistance: (distance: number) => unknown;
  createBooking: () => unknown;
  cancelBooking: () => unknown;
}
const initState: MapContextState = {
  locations: [],
  notes: [],
  price: 0,
  note: "",
  rating: null,
  startTime: null,
  endTime: null,
  nextLocationId: null,
  driverId: null,
  driver: null,
  driverOnMaps: [],
  addAddress: () => {},
  addLocation: () => {},
  removeLocation: () => {},
  replaceLocation: () => {},
  setNote: () => {},
  setNotes: () => {},
  createBooking: () => {},
  setDistance: () => {},
  cancelBooking: () => {},
  viewOnly: false,
};

export const MapContext = createContext<MapContextState>(initState);

interface MapProviderProps extends PropsWithChildren {
  booking?: Nullable<Booking>;
}

export const MapProvider = ({ children, booking = null }: MapProviderProps) => {
  const [id, setId] = useState(booking?.id);
  const [bookingStatus, setBookingStatus] = useState(booking?.status);
  const viewOnly = Boolean(bookingStatus);
  const {
    createBookingStatus,
    createBooking: createBookingBase,
    booking: data,
  } = useCreateBooking(booking ?? undefined);
  const { cancelStatus, cancelBooking: cancelBookingBase } = useCancelBooking();
  const [locations, setLocations] = useState<Location[]>(
    booking?.locations ?? [],
  );
  const { drivers: driverOnMaps } = useFindDriver({
    location: locations[0],
    autoFetch: !viewOnly,
  });
  const currentLocation = useLocation(locations?.[0]);
  const { money: price, calculate } = useCalculateCost(booking?.price);
  const [note, setNote] = useState(booking?.note ?? "");
  const [notes, setNotes] = useState((booking?.notes ?? []).map((n) => n.id));
  const [distance, setDistance] = useState(0);
  const addAddress = useCallback(async (address: string) => {
    const location = await ggMapApi.geoCode(address);
    if (location) setLocations((prev) => [...prev, location]);
  }, []);
  const addLocation = useCallback(
    async (location: Omit<Location, "address">) => {
      const { latitude, longitude } = location;
      const address = await ggMapApi.geoReverse(latitude, longitude);
      if (address) {
        setLocations((prev) => [...prev, { longitude, latitude, address }]);
      }
    },
    [],
  );
  const removeLocation = useCallback((index: number) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const replaceLocation = useCallback(
    async (index: number, address: string) => {
      const location = await ggMapApi.geoCode(address);
      setLocations((prev) => {
        const locations = [...prev];
        locations[index] = location;
        return locations;
      });
    },
    [],
  );
  const createBooking = useCallback(() => {
    if (locations.length < 2 || viewOnly) return;
    const [pickup, ...stops] = locations;
    const dropOff = stops[stops.length - 1];
    stops.pop();
    createBookingBase({
      distance,
      pickup,
      dropOff,
      stops,
      note,
      notes,
    });
  }, [createBookingBase, distance, locations, note, notes, viewOnly]);
  const cancelBooking = useCallback(() => {
    if (!id) return;
    cancelBookingBase(id);
  }, [cancelBookingBase, id]);
  useEffect(() => {
    if (!currentLocation || locations.length) return;
    addLocation(currentLocation);
  }, [currentLocation, addLocation, locations.length]);

  useEffect(() => {
    if (locations.length < 2 || viewOnly) return;
    const sto = setTimeout(() => {
      calculate({
        distance,
        numberOfWaypoints: locations.length - 2,
      });
    }, 300);
    return () => clearTimeout(sto);
  }, [calculate, distance, locations, viewOnly]);
  useEffect(() => {
    if (createBookingStatus === "success") {
      setBookingStatus("PENDING");
      setId(data?.id);
    }
  }, [createBookingStatus, data?.id]);
  useEffect(() => {
    if (cancelStatus === "success") {
      setBookingStatus(undefined);
    }
  }, [cancelStatus]);
  return (
    <MapContext.Provider
      value={{
        ...initState,
        currentLocation,
        price,
        note,
        notes,
        status: bookingStatus,
        driverOnMaps,
        setNotes,
        setNote,
        locations,
        addAddress,
        addLocation,
        removeLocation,
        replaceLocation,
        createBooking,
        setDistance,
        viewOnly,
        cancelBooking,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
