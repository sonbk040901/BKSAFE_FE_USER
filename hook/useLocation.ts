import {
  LocationAccuracy,
  enableNetworkProviderAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from "expo-location";
import {
  defineTask,
  isTaskDefined,
  unregisterAllTasksAsync,
} from "expo-task-manager";
import { useEffect, useState } from "react";
// type StatusType = "loading" | "granted" | "denied";
type LocationType = {
  latitude: number;
  longitude: number;
};
const LOCATION_TASK_NAME = "background-location-task";
// Bật GPS (tính năng lấy vị trí thiết bị mỗi giây) để lấy đc vị trí hiện tại, sau đó tắt GPS
export default function useLocation(initValue?: LocationType) {
  // const [status, setStatus] = useState<StatusType>("loading"); nếu dùng cách này thì nhược điểm là sẽ phải setStatus 2 lần
  const [location, setLocation] = useState<LocationType | undefined>(initValue);
  useEffect(() => {
    if (location) return;
    async function request() {
      defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
        const { locations } = data as {
          locations: { coords: { latitude: number; longitude: number } }[];
        };
        if (error) {
          // check `error.message` for more details.
          // setStatus("denied");
          return;
        }
        setLocation(locations[0].coords);
        // setStatus("granted");
      });
      await enableNetworkProviderAsync();
      await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 0,
        foregroundService: {
          notificationTitle: "Using your location",
          notificationBody:
            "To turn off, go back to the app and switch something off.",
        },
      });
    }
    request();
  }, [location]);
  useEffect(() => {
    if (location && isTaskDefined(LOCATION_TASK_NAME)) {
      stopLocationUpdatesAsync(LOCATION_TASK_NAME)
        .then(() => {
          unregisterAllTasksAsync();
        })
        .catch(() => {});
    }
  }, [location]);
  return location;
}
