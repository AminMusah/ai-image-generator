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

export default function feed() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { data } = useData();

  console.log(data, "data");
  // onClick={() => onOpen("editCategory", { category })}

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
    <View style={styles.container}>
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
      <View style={[styles.expand, { left: toggle ? 300 : 310 }]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.expandIcon]}
        >
          <MaterialIcons name="token" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ImageGenerated
            image={item}
            toggle={toggle}
            height={height}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#000",
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
