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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import { Entypo, Feather, Foundation, MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import ImageGenerated from "@/components/imageGenerated";
import { useData } from "@/hooks/useData";
import { useGenerate } from "@/hooks/useGenerate";
import EmptyState from "@/components/EmptyState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { prompts } from "../assets/prompts";

export default function feed() {
  const { height } = useWindowDimensions();
  const [toggle, setToggle] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false); // State for tracking scroll loading
  const { data, addImages } = useData(); // Ensure `setData` is available to update data
  const { loading, setPrompt, prompt, generate } = useGenerate();
  const navigator = useNavigation();
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastOffset, setLastOffset] = useState(0);
  const scrollViewRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      // Scroll to the bottom when the component mounts
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [data]); // Ensure it runs when data changes

  const handleGenerateMore = async () => {
    try {
      setScrollLoading(true);

      const randomEnvironment =
        prompts.environments[
          Math.floor(Math.random() * prompts.environments.length)
        ];
      const randomTheme =
        prompts.themes[Math.floor(Math.random() * prompts.themes.length)];
      const randomMood =
        prompts.moods[Math.floor(Math.random() * prompts.moods.length)];
      const newPrompt = `${prompt} now set in ${randomEnvironment}, that captures ${randomMood}, ${randomTheme}.`;
      await generate(newPrompt, null, null);
    } catch (error) {
      console.error("Error generating new images:", error);
    } finally {
      setScrollLoading(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // const currentOffset = event.nativeEvent.contentOffset.y;

    // // Trigger image generation logic only when scrolling
    // if (!isScrolling && Math.abs(currentOffset - lastOffset) > 50) {
    //   // Adjust threshold as needed
    //   setIsScrolling(true);
    //   setLastOffset(currentOffset); // Update lastOffset to current

    // Call your generation logic
    handleGenerateMore();

    // // Reset scrolling flag after a delay
    // setTimeout(() => {
    //   setIsScrolling(false);
    // }, 1000); // Adjust timeout to match your needs
    // }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

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

          <View style={[styles.expand, { left: 350 }]}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.expandIcon]}
            >
              <MaterialIcons name="token" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
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
                  onPress={async () => {
                    await generate(prompt, setModalVisible, modalVisible);
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
          ref={scrollViewRef}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageGenerated
              image={item}
              height={height}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              generate={(prompt) => generate(prompt, null, null)}
              setPrompt={setPrompt}
              prompt={prompt}
              render={render}
              setRender={setRender}
            />
          )}
          pagingEnabled
          onScroll={handleScroll}
          onEndReached={() => handleGenerateMore()}
          scrollEventThrottle={250}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            scrollLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : null
          }
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }}
        />
      )}

      {scrollLoading ? (
        <View style={{ zIndex: 300 }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : null}
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
    right: 50,
    zIndex: 300,
    justifyContent: "space-between",
    width: "80%",
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
