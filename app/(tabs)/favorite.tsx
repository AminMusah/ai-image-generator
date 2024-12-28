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

export default function favorite() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [render, setRender] = useState(false);
  const navigator = useNavigation();
  const { rendering, data } = useData();

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

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, [render, rendering]);

  const favoriteImages = data.filter((image: any) =>
    favorites.includes(image.id)
  );

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
      {favoriteImages.length === 0 ? (
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
          data={favoriteImages}
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
