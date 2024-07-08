export const IMAGE = {
  logo: require("../assets/images/logo.png"),
  cropLogo: require("../assets/images/crop-logo.png"),
  pin: require("../assets/images/pin.png"),
  location: require("../assets/images/location.png"),
  driverPin: require("../assets/images/driver-pin.png"),
  homePin: require("../assets/images/home-pin.png"),
  downPin: require("../assets/images/down-pin.png"),
  avatar: require("../assets/images/avatar.png"),
  hotline: require("../assets/images/hotline.png"),
  camera: require("../assets/images/camera.png"),
} as const;
export const ICON = {
  user: require("../assets/icons/user.png"),
  idCard: require("../assets/icons/id-card.png"),
  location: require("../assets/icons/location.png"),
  calendar: require("../assets/icons/calendar.png"),
  expired: require("../assets/icons/expired.png"),
  birthday: require("../assets/icons/birthday.png"),
  driversLicense: require("../assets/icons/drivers-license.png"),
  truck: require("../assets/icons/truck.png"),
} satisfies Record<string, unknown>;
