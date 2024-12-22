import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const EmptyState = ({
  title = "Uh Oh",
  subtitle = "Something went wrong!",
  buttonText = "Go Home",
  setModalVisible,
  modalVisible,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: 600 }}>{title}</Text>
      <Text style={{ fontSize: 20, marginVertical: 5 }}>{subtitle}</Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 12,
          backgroundColor: "#000",
          borderRadius: 10,
          flexDirection: "row",
          marginHorizontal: 18,
          borderWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        onPress={() => {
          if (buttonText === "Generate") {
            setModalVisible(!modalVisible);
          } else {
            navigation.goBack();
          }
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
