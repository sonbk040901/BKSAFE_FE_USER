import React, { type FC } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { RecentsBookingResponse } from "../../api/booking";
import TravelCard from "./TravelCard";

interface TravelListProps {
  data: Nullable<RecentsBookingResponse>;
  refreshing?: boolean;
  onRefresh?: () => void;
  onSelected?: () => void;
}

const TravelList: FC<TravelListProps> = ({
  data,
  refreshing = false,
  onRefresh,
  onSelected,
}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        width: "100%",
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{ alignItems: "center", gap: 20, paddingVertical: 20 }}>
        <TravelCard
          title="Chuyến đi hiện tại"
          data={data?.current ?? null}
          onPress={onSelected}
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
