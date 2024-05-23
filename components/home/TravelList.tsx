import React, { type FC } from "react";
import { useRecentsBooking } from "../../api/hook";
import { useAppDispatch } from "../../states";
import { patchBooking } from "../../states/slice/booking";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp } from "../../types/navigation";
import { RefreshControl, ScrollView, View } from "react-native";
import TravelCard from "./TravelCard";

interface TravelListProps {}

const TravelList: FC<TravelListProps> = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const { data, refetch, isFetching } = useRecentsBooking();
  const dispatch = useAppDispatch();
  const handleSelectBooking = () => {
    dispatch(patchBooking(data?.current ?? undefined));
    navigation.push("Map");
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
    >
      <View style={{ alignItems: "center", gap: 20, paddingVertical: 20 }}>
        <TravelCard
          title="Chuyến đi hiện tại"
          data={data?.current ?? null}
          onPress={handleSelectBooking}
        />
        {data?.recent && (
          <TravelCard
            title="Chuyến đi trước"
            data={data.recent}
            viewOnly
          />
        )}
      </View>
    </ScrollView>
  );
};

export default TravelList;
