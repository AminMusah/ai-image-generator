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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function explore() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [image, setImage] = useState<
    { id: number; url: string; description: string }[]
  >([]);

  const { data, rendering } = useData();
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      {data.length > 0 && (
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

      {data.length === 0 ? (
        <EmptyState
          title="Empty"
          subtitle="Explore page is empty!"
          buttonText="Go back"
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageGenerated
              image={item}
              height={height}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              generate={() => {}}
              setPrompt={() => {}}
              prompt={""}
              render={render}
              setRender={setRender}
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
    top: 50,
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
