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
import { Entypo, Feather, Foundation } from "@expo/vector-icons";
import { FlatList } from "react-native";
import ImageGenerated from "@/components/imageGenerated";

export default function feed() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);

  const images = [
    {
      id: 1,
      url: "https://pbs.twimg.com/media/GdZysn8akAAOSod?format=jpg&name=4096x4096",
      description: "A beautiful mountain landscape at sunrise.",
    },
    {
      id: 2,
      url: "https://pbs.twimg.com/media/GdYOwkNXkAAypiu?format=jpg&name=large",
      description: "A serene beach with clear blue water.",
    },
    {
      id: 3,
      url: "https://pbs.twimg.com/media/GdZysn8akAAOSod?format=jpg&name=4096x4096",
      description: "A city skyline with skyscrapers during sunset.",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          height,
          // paddingVertical: toggle ? 40 : 0,
          paddingHorizontal: toggle ? 15 : 0,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <View style={styles.expand}>
          {toggle ? (
            <TouchableOpacity
              onPress={() => setToggle(false)}
              style={styles.expandIcon}
            >
              <Foundation name="arrows-expand" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setToggle(true)}
              style={styles.expandIcon}
            >
              <Foundation name="arrows-compress" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <ImageGenerated image={item} toggle={toggle} height={height} />
          )}
          pagingEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#000",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    // height: 550,
  },
  image: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 30,
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
