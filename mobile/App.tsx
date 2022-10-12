import { StatusBar } from "react-native";
import { Background } from "./src/components/Background";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts
} from "@expo-google-fonts/inter";
import { Subscription } from "expo-modules-core";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription
} from "expo-notifications";
import { useEffect, useRef } from "react";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { getPushNotificationToken } from "./src/services/notifications/getPushNotificationToken";
import "./src/services/notifications/notificationConfigs";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    let notificationListener = getNotificationListener.current;
    let responseNotificationListenerCurrent =
      responseNotificationListener.current;

    notificationListener = addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    responseNotificationListenerCurrent =
      addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener && responseNotificationListenerCurrent) {
        removeNotificationSubscription(notificationListener);
        removeNotificationSubscription(responseNotificationListenerCurrent);
      }
    };
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
