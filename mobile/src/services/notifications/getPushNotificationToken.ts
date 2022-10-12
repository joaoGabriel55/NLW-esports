import * as Notifications from "expo-notifications";

export async function getPushNotificationToken(): Promise<string | undefined> {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    await Notifications.requestPermissionsAsync();
  } else {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log("NOTIFICATION TOKEN =>", pushToken.data);

    return pushToken.data;
  }
}
