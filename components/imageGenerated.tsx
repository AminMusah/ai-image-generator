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
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";

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
  const pathname = usePathname();
  const [favorites, setFavorites] = useState<number[]>([]);

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
      console.log("Sharing complete!");
    } catch (error) {
      console.error("Error sharing image:", error);
      Alert.alert("Error", "Failed to share the image.");
    }
  };

  const FAVORITES_KEY = "favorites";

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  };

  const saveFavorites = async (favorites: any) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, [render, rendering]);

  const toggleFavorite = async (imageId: any) => {
    const isFavorited = favorites.includes(imageId);
    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter((id) => id !== imageId);
    } else {
      updatedFavorites = [...favorites, imageId];
    }
    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  };

  const removeFavorite = async (imageId: any) => {
    const updatedFavorites = favorites.filter((id) => id !== imageId);
    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  };

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
        {pathname === "/favorite" ? (
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              removeFavorite(image.id);
              setRender(!render);
              onRender({ rendering: render });
            }}
          >
            <FontAwesome
              name="heart"
              size={34}
              color={favorites.includes(image.id) ? "red" : "white"}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              toggleFavorite(image.id);
              setRender(!render);
              onRender({ rendering: render });
            }}
            style={styles.action}
          >
            <FontAwesome
              name="heart"
              size={34}
              color={favorites.includes(image.id) ? "red" : "white"}
            />
          </TouchableOpacity>
        )}
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
