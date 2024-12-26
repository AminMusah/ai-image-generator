import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import { Entypo, Feather, Foundation, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import ImageGenerated from "@/components/imageGenerated";
import { useData } from "@/hooks/useData";
import EmptyState from "@/components/EmptyState";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ImageProps {
  id: number;
  url: string;
  prompt: string;
  fav: boolean;
}

export default function favorite() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [render, setRender] = useState(false);
  const navigator = useNavigation();
  const { rendering } = useData();

  const getImagesFromStorage = async () => {
    try {
      // Retrieve the JSON string from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("@images");

      // Parse the JSON string back into an array
      const images = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log("Retrieved images:", images);

      const updatedImages = images.filter((image: ImageProps) => image.fav);

      setFavorites(updatedImages); // Filter images with 'fav = true'
      // return images;
    } catch (error) {
      console.error("Error retrieving images:", error);
      return [];
    }
  };

  console.log(rendering, "fa");

  useEffect(() => {
    getImagesFromStorage();
  }, [render, rendering]);

  console.log(favorites, "hi", render, rendering);

  return (
    <View style={styles.container}>
      {favorites.length > 0 && (
        <>
          <View style={styles.expand}>
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.removeItem("@images");
                navigator.goBack();
                setRender(!render);
              }}
              style={styles.expandIcon}
            >
              <Feather name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
      {favorites.length === 0 ? (
        <EmptyState
          title="Empty"
          subtitle="Your favorite images are waiting"
          buttonText="Go to feed"
          buttonLink="/feed"
          setModalVisible={modalVisible}
          modalVisible={modalVisible}
        />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <ImageGenerated
              image={item}
              height={height}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              render={render}
              setRender={setRender}
              generate={() => {}}
              setPrompt={() => {}}
              prompt={""}
            />
          )}
          pagingEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // paddingBottom: 40,
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
