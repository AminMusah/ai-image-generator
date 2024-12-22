import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import { Entypo, Feather, Foundation, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import ImageGenerated from "@/components/imageGenerated";
import { useData } from "@/hooks/useData";
import { useGenerate } from "@/hooks/useGenerate";
import EmptyState from "@/components/EmptyState";

export default function feed() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { data } = useData();
  const { loading, setPrompt, prompt, generate } = useGenerate();

  // console.log(data, "data");

  const images = [
    {
      id: 1,
      url: "https://pbs.twimg.com/media/GdZysn8akAAOSod?format=jpg&name=4096x4096",
      prompt: "A beautiful mountain landscape at sunrise.",
    },

    {
      id: 2,
      url: "https://pbs.twimg.com/media/GdYOwkNXkAAypiu?format=jpg&name=large",
      prompt: "A serene beach with clear blue water.",
    },
    {
      id: 3,
      url: "https://pbs.twimg.com/media/GdZysn8akAAOSod?format=jpg&name=4096x4096",
      prompt: "A city skyline with skyscrapers during sunset.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.expand}>
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
      </View> */}
      {data.length > 0 && (
        <View style={[styles.expand, { left: 350 }]}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={[styles.expandIcon]}
          >
            <MaterialIcons name="token" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={styles.modalView}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.inputContainer}>
              <TextInput
                value={prompt}
                style={styles.textInput}
                onChangeText={(value) => setPrompt(value)}
                placeholder="prompt to generate an image"
              />
              {loading ? (
                <ActivityIndicator
                  style={{ position: "absolute", right: 10, bottom: "20%" }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    generate(prompt);
                  }}
                  style={{ position: "absolute", right: 10, bottom: "20%" }}
                >
                  <MaterialIcons name="token" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        </View>
      </Modal>
      {data.length === 0 ? (
        <EmptyState
          title="Empty"
          subtitle="click button to enter prompt!"
          buttonText="Generate"
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
              generate={generate}
              setPrompt={setPrompt}
              prompt={prompt}
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
    top: 70,
    right: 50,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  inputContainer: {
    width: "100%",
    height: 55,
    marginTop: 8,
  },
  textInput: {
    flex: 1,
    marginTop: 8,
    fontWeight: "400",
    paddingHorizontal: 10,
    paddingLeft: 30,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#999",
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});
