import {
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
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
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ImageGeneratedProps {
  prompt: string;
  image: { id: any; url: string; prompt: string; fav: boolean };
  height: any;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  render: boolean;
  setRender: (visible: boolean) => void;
  setPrompt: (visible: string) => void;
  generate: (prompt: string) => void;
}

interface ImageProps {
  id: number;
  url: string;
  prompt: string;
  fav: boolean;
}

export default function ImageGenerated({
  image,
  height,
  modalVisible,
  setModalVisible,
  setPrompt,
  generate,
  prompt,
  render,
  setRender,
}: ImageGeneratedProps) {
  const { onRender, rendering } = useData();
  const requestPermission = async () => {
    const { status, canAskAgain, expires, granted } =
      await MediaLibrary.requestPermissionsAsync();

    return { status, granted, canAskAgain, expires };
  };

  const downloadImage = async (url: string) => {
    // Check if the URL is valid before proceeding
    console.log(url, "url");
    if (!url || url.trim() === "") {
      console.error("Invalid URL: URL cannot be empty");
      Alert.alert("Error", "Invalid URL: URL cannot be empty");
      return;
    }

    const { status, granted } = await requestPermission();

    if (status !== MediaLibrary.PermissionStatus.GRANTED) {
      console.log("Permission denied");
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}downloaded-image.jpg`;

    try {
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log("Downloaded file location:", uri);
      await saveImageToGallery(uri);
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "Failed to download the image.");
    }
  };

  const saveImageToGallery = async (localUri: string) => {
    if (!localUri.startsWith("file:///")) {
      console.error("Invalid URI: Must start with 'file:///'");
      return;
    }

    try {
      // Check if the file exists before creating an asset
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (!fileInfo.exists) {
        console.error("File does not exist:", localUri);
        Alert.alert("Error", "File does not exist.");
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(localUri);
      Alert.alert("Success", `Image saved to gallery: ${asset.uri}`);
      console.log("Saved asset URI:", asset.uri);
    } catch (error) {
      console.error("Error saving image to gallery:", error);
      Alert.alert("Error", "Failed to save the image to gallery.");
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

  const saveImageToStorage = async (image: ImageProps) => {
    try {
      // Retrieve the current images from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("@images");
      const currentImages = jsonValue != null ? JSON.parse(jsonValue) : [];

      // Check if the image already exists
      const imageIndex = currentImages.findIndex(
        (img: ImageProps) => img.id === image.id
      );

      if (imageIndex !== -1) {
        // If it exists, toggle the fav property
        const existingImage = currentImages[imageIndex];
        existingImage.fav = !existingImage.fav; // Toggle fav
        currentImages[imageIndex] = existingImage; // Update the existing image
        console.log("Image updated in storage with toggled fav.");
      } else {
        // If it doesn't exist, add the new image with fav set to true
        const newImage = { ...image, fav: true }; // Set fav to true for new images
        currentImages.push(newImage);
        console.log("Image added to storage.");
      }

      // Convert the updated array to a JSON string
      const updatedJsonValue = JSON.stringify(currentImages);

      // Save the updated JSON string to AsyncStorage
      await AsyncStorage.setItem("@images", updatedJsonValue);
      console.log("Images saved successfully");
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const getImagesFromStorage = async () => {
    try {
      // Retrieve the JSON string from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("@images");
      console.log(" images:", jsonValue);

      // Parse the JSON string back into an array
      const images = jsonValue !== null ? JSON.parse(jsonValue) : [];
      console.log("Retrieved images:", images);
      return images;
    } catch (error) {
      console.error("Error retrieving images:", error);
      return [];
    }
  };

  const removeImageFromStorage = async (imageId: any) => {
    try {
      // Retrieve the current images from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("@images");
      const currentImages = jsonValue !== null ? JSON.parse(jsonValue) : [];

      console.log("Current Images:", currentImages);

      // Filter out the image with the matching id
      const updatedImages = currentImages.filter(
        (image: any) => image.id !== imageId
      );

      console.log("Updated Images:", updatedImages);

      // Save the updated array back to AsyncStorage
      const updatedJsonValue = JSON.stringify(updatedImages);
      await AsyncStorage.setItem("@images", updatedJsonValue);

      console.log(`Image with ID ${imageId} removed successfully`);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  useEffect(() => {
    getImagesFromStorage();
  }, [render, rendering]);

  return (
    <View
      style={{
        height,
      }}
    >
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
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={async () => {
            const imagesInStorage = await getImagesFromStorage();
            const imageExists = imagesInStorage.some(
              (img: ImageProps) => img.id === image.id
            );

            if (imageExists) {
              const updatedImage = { ...image, fav: true };
              console.log(updatedImage, "up");
              console.log(updatedImage, "up");
              saveImageToStorage(updatedImage);
              // removeImageFromStorage(updatedImage.id);
            } else {
              const updatedImage = { ...image, fav: false };
              console.log(updatedImage, "update");
              saveImageToStorage(updatedImage);
            }
            setRender(!render);
            onRender({ rendering: render });
          }}
          style={styles.action}
        >
          <FontAwesome
            name="heart"
            size={34}
            color={image.fav ? "red" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => downloadImage(image.url)}>
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
      </View>
      <Text style={styles.prompt}>{image.prompt}</Text>
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
    marginBottom: 40,
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
  prompt: { color: "#fff", fontWeight: 900, marginTop: 10 },
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
