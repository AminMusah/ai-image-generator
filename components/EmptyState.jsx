import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, Link, useRouter } from "expo-router";

const EmptyState = ({
  title = "Uh Oh",
  subtitle = "Something went wrong!",
  buttonText = "Go Home",
  buttonLink = "/index",
  setModalVisible,
  modalVisible,
}) => {
  const navigation = useNavigation();
  const router = useRouter();

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
        style={styles.button}
        onPress={() => {
          if (buttonText === "Generate") {
            setModalVisible(!modalVisible);
          } else if (buttonLink.split("")[0] === "/") {
            router.push("/feed");
          } else {
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
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
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default EmptyState;
