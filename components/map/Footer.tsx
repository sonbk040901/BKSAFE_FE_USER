import { Button, Divider, Icon, Text } from "@rneui/themed";
import React, { ComponentProps, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { BookingStatus } from "../../api";
import useFindDriverMode from "../../api/hook/useFindDriverMode";
import { COLOR } from "../../constants/color";
import { STYLE } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  cancelBooking,
  createBooking,
  patchBooking,
  selectBooking,
} from "../../states/slice/booking";
import NotesDialog from "../booking/NotesDialog";
import DriverInfo from "../home/DriverInfo";
const statusMapping: Record<BookingStatus | "none", string> = {
  none: "Thuê tài xế?",
  PENDING: "Đang tìm tài xế phù hợp...",
  ACCEPTED: "Đang tìm tài xế phù hợp...",
  RECEIVED: "Tài xế đang trên đường tới...",
  // driving: (next: string) => `Điểm đến tiếp theo: ${next}`,
  DRIVING: "Chuyến đi đang diễn ra...",
  COMPLETED: "Chuyến đi đã hoàn thành",
  REJECTED: "Tài xế đã từ chối chuyến đi",
  CANCELLED: "Chuyến đi đã bị hủy",
  TIMEOUT: "Hết thời gian chờ",
};

interface FooterProps extends ComponentProps<typeof Animated.View> {
  onCancel?: () => void;
}

function Footer(props: FooterProps) {
  const { status, price, id, note, driver, locations, nextLocationId } =
    useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const [notesAddDialogVisiable, setNotesAddDialogVisiable] = useState(false);
  const { data: autoFind } = useFindDriverMode();
  const { style: customStyle, onCancel } = props;
  const isVisible =
    !status ||
    status === "PENDING" ||
    status === "ACCEPTED" ||
    status === "RECEIVED";
  const disable = !!(!price || status);

  const footerTitle = statusMapping[status || "none"];
  const nextLocation = locations.find((l) => l.id === nextLocationId);
  const handleCreateBooking = () => {
    if (!id) return;
    dispatch(cancelBooking(id));
    onCancel?.();
  };
  const handleOpenNotes = () => {
    setNotesAddDialogVisiable(true);
  };
  const handleCloseNotes = () => {
    setNotesAddDialogVisiable(false);
  };
  const handleChangeNote = (note: string) => {
    dispatch(patchBooking({ note }));
  };
  return (
    <Animated.View
      {...props}
      style={[customStyle, styles.container, STYLE.shadow]}
    >
      <View
        style={{ width: "100%", position: "absolute", top: -15, right: 10 }}
      >
        <Text style={{ fontSize: 10, fontWeight: "500", textAlign: "right" }}>
          {status === "PENDING" &&
            !autoFind &&
            "Quản trị viên sẽ liên hệ với bạn sau ít phút"}
        </Text>
      </View>
      {!status && (
        <TouchableOpacity style={{ position: "absolute", top: -35, right: 10 }}>
          <Icon
            name="more-vertical"
            type="feather"
            size={25}
            color={COLOR.secondary}
          />
        </TouchableOpacity>
      )}
      {driver && (
        <View style={{ width: "90%", paddingTop: 5 }}>
          <DriverInfo driverProps={driver ?? undefined} />
        </View>
      )}
      <View style={{ width: "100%" }}>
        <Divider />
      </View>
      {!status ? (
        <View style={styles.tool}>
          <Button
            radius="lg"
            size="md"
            type="outline"
            buttonStyle={styles.toolBtn}
          >
            Thanh toán
          </Button>
          <Button
            radius="lg"
            size="md"
            type="outline"
            buttonStyle={styles.toolBtn}
          >
            Ưu đãi
          </Button>
          <Button
            radius="lg"
            size="md"
            type="outline"
            buttonStyle={styles.toolBtn}
            onPress={handleOpenNotes}
          >
            Ghi chú
          </Button>
        </View>
      ) : (
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerTitle,
              styles[
                status === "PENDING" || status === "RECEIVED"
                  ? "footerTitleWarn"
                  : "footerTitleInfo"
              ],
            ]}
          >
            {status !== "DRIVING" ? footerTitle : "Điểm đến tiếp theo"}
          </Text>
          {nextLocation && (
            <Text
              style={{ fontSize: 11, color: COLOR.secondary }}
              numberOfLines={1}
            >
              {nextLocation.address}
            </Text>
          )}
        </View>
      )}
      <NotesDialog
        text={note}
        isVisible={notesAddDialogVisiable}
        onRequestClose={handleCloseNotes}
        onChangeText={handleChangeNote}
      />
      <View style={{ width: "90%", flexDirection: "row", gap: 10 }}>
        {status && isVisible && (
          <Button
            containerStyle={{
              borderRadius: 20,
              borderWidth: 0.5,
              borderColor: COLOR.warning,
            }}
            buttonStyle={{ backgroundColor: COLOR.warningBackground }}
            titleStyle={{
              fontSize: 16,
              paddingVertical: 3,
              paddingHorizontal: 5,
              color: COLOR.warning,
            }}
            icon={{
              name: "trash",
              size: 20,
              color: COLOR.warning,
              type: "feather",
            }}
            iconRight
            onPress={handleCreateBooking}
          >
            Hủy
          </Button>
        )}
        <Button
          radius="lg"
          size="md"
          containerStyle={{ flex: 1, borderRadius: 20 }}
          disabledStyle={styles.disable}
          disabledTitleStyle={{ color: "white" }}
          disabled={disable}
          onPress={() => dispatch(createBooking())}
          titleStyle={{ fontSize: 16, paddingVertical: 3 }}
          icon={
            price !== undefined && {
              name: "chevron-right",
              size: 20,
              color: "white",
              type: "feather",
            }
          }
          iconRight
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingVertical: 3,
            }}
          >
            <Text
              style={{
                color: "white",
                flex: 1,
                fontSize: 16,
                fontWeight: "bold",
              }}
              numberOfLines={1}
            >
              {status === "PENDING"
                ? "Đang tìm tài xế "
                : "Tìm tài xế lái xe hơi"}
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {price ? `${price.toLocaleString()}đ` : ""}
            </Text>
          </View>
        </Button>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    paddingBottom: 10,
    paddingTop: 0,
    gap: 12,
    bottom: 0,
    left: 0,
    zIndex: 999,
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 0.5,
    borderColor: COLOR.secondaryBackground,
  },
  tool: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "white",
    width: "100%",
  },
  toolBtn: {
    paddingHorizontal: 17,
  },
  disable: {
    opacity: 0.7,
    backgroundColor: COLOR.primary,
  },
  pendingContainer: {},
  footer: {
    justifyContent: "center",
    width: "90%",
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "flex-end",
  },
  footerTitleInfo: {
    color: COLOR.primary,
  },
  footerTitleWarn: {
    color: COLOR.warning,
  },
});
export default Footer;
