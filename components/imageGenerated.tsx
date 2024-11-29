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
} from "react-native";
import Text from "./CustomText";
import { useState } from "react";

interface ImageGeneratedProps {
  toggle: boolean;
  image: { id: number; url: string; description: string };
  height: any;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export default function ImageGenerated({
  toggle,
  image,
  height,
  modalVisible,
  setModalVisible,
}: ImageGeneratedProps) {
  return (
    <View
      style={{
        height,
        paddingVertical: toggle ? 35 : 0,
        paddingHorizontal: toggle ? 15 : 0,
        // marginBottom: 50,
      }}
    >
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
                style={styles.textInput}
                placeholder="prompt to generate an image"
              />
              <View style={{ position: "absolute", right: 10, bottom: "20%" }}>
                <TouchableOpacity onPress={() => {}}>
                  <MaterialIcons name="token" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>

      <Image
        style={[
          styles.image,
          {
            borderBottomLeftRadius: toggle ? 30 : 0,
            borderBottomRightRadius: toggle ? 30 : 0,
            borderTopRightRadius: toggle ? 30 : 0,
            borderTopLeftRadius: toggle ? 30 : 0,
          },
        ]}
        source={{ uri: image.url }}
        resizeMode={"cover"}
      />
      <View style={styles.actionsContainer}>
        <Entypo name="forward" size={34} color="white" style={styles.action} />
        <Feather name="heart" size={34} color="white" />
      </View>
      <Text style={{ color: "#fff", fontWeight: 900, marginTop: 10 }}>
        {image.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1, // Fills parent container (full screen)
    justifyContent: "center", // Center the content
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderWidth: 1,
    // borderRadius: 30,
  },
  actionsContainer: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  action: {
    marginBottom: 20,
  },
  modalView: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
