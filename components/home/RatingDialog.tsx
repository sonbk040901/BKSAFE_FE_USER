import { Button, Dialog, Input } from "@rneui/themed";
import React, { useEffect, type FC } from "react";
import { View } from "react-native";
import { Rating } from "react-native-ratings";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  clearRating,
  createRating,
  selectRating,
  updateRating,
} from "../../states/slice/rating";
import { showNativeAlert } from "../../utils/alert";

interface RatingDialogProps {}

const RatingDialog: FC<RatingDialogProps> = () => {
  const { bookingId, rating, status } = useAppSelector(selectRating);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "success") {
      showNativeAlert("Đánh giá thành công");
      dispatch(clearRating());
    }
  }, [dispatch, status]);
  const handleRequestClose = () => {
    dispatch(updateRating({ bookingId: undefined }));
  };
  const handleChangeRating = (rating: number) => {
    dispatch(updateRating({ rating }));
  };
  const handleChangeReview = (review: string) => {
    dispatch(updateRating({ review }));
  };
  const handleSubmit = () => {
    dispatch(createRating());
  };
  const isVisible = !!bookingId;
  const isDiableSubmit = !rating;
  return (
    <Dialog
      statusBarTranslucent
      transparent
      onRequestClose={handleRequestClose}
      isVisible={isVisible}
      animationType="fade"
    >
      <Dialog.Title
        titleStyle={{ textAlign: "center", fontSize: 20 }}
        title={"Đánh giá chuyến đi"}
      />
      <View style={{ paddingTop: 10, gap: 10 }}>
        <Rating
          minValue={1}
          onFinishRating={handleChangeRating}
          startingValue={0}
        />
        <Input
          placeholder="Nhận xét"
          onChangeText={handleChangeReview}
        />
      </View>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        <Button
          type="outline"
          size="lg"
          containerStyle={{ flex: 1 }}
          onPress={handleRequestClose}
        >
          Bỏ qua
        </Button>
        <Button
          size="lg"
          containerStyle={{ flex: 1 }}
          onPress={handleSubmit}
          disabled={isDiableSubmit}
        >
          Gửi
        </Button>
      </View>
    </Dialog>
  );
};

export default RatingDialog;
