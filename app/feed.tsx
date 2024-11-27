import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useNavigation } from "expo-router";

export default function feed() {
  const navigation = useNavigation();

  //   useEffect(() => {
  //     navigation.setOptions({
  //       headerStyle: {
  //         backgroundColor: "#f4511e",
  //       },
  //       headerTintColor: "#fff",
  //       headerTitleStyle: {
  //         fontWeight: "bold",
  //       },
  //     });
  //   }, [navigation]);

  return (
    <View>
      <Text>feed</Text>
    </View>
  );
}
