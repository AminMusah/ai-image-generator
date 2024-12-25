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
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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
  const downloadImage = async (url: string) => {
    const imageUri = "https://example.com/path-to-image.jpg"; // Replace with your image URL
    const fileUri = FileSystem.documentDirectory + "downloaded-image.jpg";

    try {
      const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);
      Alert.alert("Download complete!", `File saved to: ${uri}`);
      console.log("Downloaded file location:", uri);
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "Failed to download the image.");
    }
  };

  const shareImage = async (url: string) => {
    try {
      await Sharing.shareAsync(url, {
        dialogTitle: "Save/Share Image",
        mimeType: "image/jpeg",
        UTI: "public.jpeg",
      });
      Alert.alert("Sharing complete!");
      console.log("Sharing complete!");
    } catch (error) {
      console.error("Error sharing image:", error);
      Alert.alert("Error", "Failed to share the image.");
    }
  };

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
        <TouchableOpacity onPress={() => downloadImage("")}>
          <Entypo
            name="download"
            size={34}
            color="white"
            style={styles.action}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            shareImage(image.url);
          }}
        >
          <Entypo
            name="forward"
            size={34}
            color="white"
            style={styles.action}
          />
        </TouchableOpacity>
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
