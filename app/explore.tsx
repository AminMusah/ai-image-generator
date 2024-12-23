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
import EventSource from "react-native-event-source";

export default function explore() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<
    { id: number; url: string; description: string }[]
  >([]);

  const { data } = useData();

  console.log(data, "data");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://image.pollinations.ai/feed");
        const result = await response.json();
        setImage(result); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://image.pollinations.ai/feed");
      const data = await response.json();
      console.log(data, "data");
      setImage((prevImages) => [...prevImages, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //     console.log("hello");
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  console.log(image, "t");

  return (
    <View style={styles.container}>
      {/*  <View style={styles.expand}>
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
      </View>  */}
      {/* <View style={[styles.expand, { left: toggle ? 300 : 310 }]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.expandIcon]}
        >
          <MaterialIcons name="token" size={24} color="#fff" />
        </TouchableOpacity>
      </View> */}

      {data.length === 0 ? (
        <EmptyState
          title="Empty"
          subtitle="Explore page is empty!"
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ImageGenerated
              image={item}
              height={height}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
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
