import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Image,
  View,
  Modal,
  Pressable,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Text from "./CustomText";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import { useData } from "@/hooks/useData";
import { useGenerate } from "@/hooks/useGenerate";
// import AsyncStorage from "@react-native-async-storage/async-storage";

interface ImageGeneratedProps {
  prompt: string;
  image: { id: any; url: string; prompt: string };
  height: any;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setPrompt: (visible: string) => void;
  generate: (prompt: string) => void;
}

export default function ImageGenerated({
  image,
  height,
  modalVisible,
  setModalVisible,
  setPrompt,
  generate,
  prompt,
}: ImageGeneratedProps) {
  return (
    <View
      style={{
        height,
        // paddingVertical: 35,
        // paddingHorizontal: 15,
        // marginVertical: 20,
      }}
    >
      {/* 
      <View style={[styles.expand, { left: toggle ? 300 : 310 }]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.expandIcon]}
        >
          <MaterialIcons name="token" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}

      {/* {!image?.url ? ( */}
      {/* <Image
        style={[
          styles.image,
          {
                       borderRadius: 30,

          },
        ]}
        source={{
          uri: "https://pbs.twimg.com/media/GdZysn8akAAOSod?format=jpg&name=4096x4096",
        }}
        resizeMode={"cover"}
      /> */}
      {/* ) : ( */}

      <Image
        style={[
          styles.image,
          {
            borderRadius: 30,
          },
        ]}
        source={{ uri: image.url }}
        resizeMode={"cover"}
      />
      {/* )} */}
      <View style={styles.actionsContainer}>
        <Entypo name="forward" size={34} color="white" style={styles.action} />
        <TouchableOpacity
          onPress={() => {
            console.log("hello");

            // storeData("favorite", image.url)
          }}
        >
          <Feather name="heart" size={34} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#fff", fontWeight: 900, marginTop: 10 }}>
        {image.prompt}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "90%",
    borderWidth: 1,
    borderRadius: 30,
  },
  actionsContainer: {
    position: "absolute",
    bottom: 160,
    right: 20,
  },
  action: {
    marginBottom: 20,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  expand: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 300,
  },
  expandIcon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a3a3a3",
    marginRight: 8,
  },
});
