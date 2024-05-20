import { Dialog, OverlayProps } from "@rneui/themed";
import React, { type FC } from "react";

interface LoadingDialogProps extends OverlayProps {
  title: string;
}

const LoadingDialog: FC<LoadingDialogProps> = (props) => {
  return (
    <Dialog
      statusBarTranslucent
      {...props}
    >
      <Dialog.Title
        titleStyle={{ textAlign: "center" }}
        title={props.title}
      />
      <Dialog.Loading />
    </Dialog>
  );
};

export default LoadingDialog;
