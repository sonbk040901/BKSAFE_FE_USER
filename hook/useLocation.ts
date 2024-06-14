import {
  LocationAccuracy,
  enableNetworkProviderAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import { defineTask, unregisterTaskAsync } from "expo-task-manager";
import { useCallback, useEffect, useState } from "react";
type LocationType = {
  latitude: number;
  longitude: number;
};
type LocationTaskData = {
  locations: {
    coords: {
      latitude: number;
      longitude: number;
    };
  }[];
};

type UseLocationOptions = {
  oneTime?: boolean;
};
const LOCATION_TASK_NAME = "background-location-task";
// Bật GPS (tính năng lấy vị trí thiết bị mỗi giây) để lấy đc vị trí hiện tại, sau đó tắt GPS
export default function useLocation(
  initValue: LocationType | undefined,
  opts: UseLocationOptions = {},
) {
  const { oneTime = true } = opts;
  const [location, setLocation] = useState(initValue);
  const stopLocation = useCallback(async () => {
    await stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }, []);
  const startLocation = useCallback(async () => {
    await enableNetworkProviderAsync();
    await new Promise((r) => setTimeout(r, 1000));
    await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  }, []);
  useEffect(() => {
    defineTask<LocationTaskData>(LOCATION_TASK_NAME, ({ data, error }) => {
      const { locations } = data;
      if (error) return;
      setLocation(locations[0].coords);
      if (oneTime) stopLocation().catch(() => {});
    });
    return () => void unregisterTaskAsync(LOCATION_TASK_NAME).catch(() => {});
  }, [stopLocation, oneTime]);
  useEffect(() => {
    startLocation().catch(() => {});
    return () => void stopLocation().catch(() => {});
  }, [startLocation, stopLocation]);
  return { location, startLocation, stopLocation };
}
