import {
  Image,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import Text from "@/components/CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import { useGenerate } from "@/hooks/useGenerate";

export default function HomeScreen() {
  const { loading, images, prompt, setPrompt, generate } = useGenerate();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heroText}>Generate images</Text>
      <View style={styles.subContainer}>
        <View style={styles.wrapper}>
          <Link href={"/feed"} style={{}}>
            <Text style={styles.wrapperText}>Provide a phrase</Text>
          </Link>
          <Text
            style={[
              styles.wrapperText,
              {
                backgroundColor: "#5a5d60",
                color: "#fff",
                borderColor: "#5a5d60",
              },
            ]}
          >
            Nice shot!
          </Text>
        </View>
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={prompt}
            onChangeText={(value) => setPrompt(value)}
            placeholder="prompt to generate an image"
          />
          <TouchableOpacity
            onPress={() => generate(prompt, null, null)}
            style={{ position: "absolute", right: 10, bottom: "20%" }}
          >
            <MaterialIcons name="token" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
        <View style={styles.hompageImageContainer}>
          <View style={[styles.hompageImageSubContainer]}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#5F5AA2"
                style={{
                  flex: 1,
                  padding: 2,
                }}
              />
            ) : images && images?.length > 0 ? (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: images[images.length - 1]?.url }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/image3.webp")}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/images/image2.webp")}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Link href={"/feed"} style={{ flex: 1 }}>
            <View
              style={[
                styles.generateMoreCard,
                {
                  borderTopEndRadius: 30,
                  borderBottomEndRadius: 0,
                  borderBottomStartRadius: 30,
                  borderTopStartRadius: 0,
                },
              ]}
            >
              <Text style={styles.generateMoreCardText}>
                Scroll to generate
              </Text>
              <MaterialIcons name="arrow-forward" size={24} color="black" />
            </View>
          </Link>
        </View>
        <View style={[styles.hompageImageSubContainer, { marginBottom: 30 }]}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/images/image1.webp")}
              resizeMode="cover"
            />
          </View>
          <View style={styles.imageContainer}>
            <Link href={"/explore"} style={{ height: "100%" }}>
              <View style={styles.generateMoreCard}>
                <Text style={styles.generateMoreCardText}>Explore</Text>
                <MaterialIcons name="arrow-forward" size={24} color="black" />
              </View>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  heroText: {
    color: "#fff",
    paddingTop: 70,
    fontSize: 60,
    lineHeight: 56,
  },
  subContainer: {
    paddingTop: 30,
    paddingBottom: 80,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapperText: {
    // fontWeight: "800",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    textAlign: "center",
    color: "#000",
    borderRadius: 30,
    // flex: 1,
    width: "49%",
  },
  hompageImageContainer: {
    paddingTop: 20,
  },
  hompageImageSubContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
    padding: 2,
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
    paddingLeft: 30,
    paddingRight: 40,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#999",
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  image: {
    width: "100%",
    height: 180,
    borderWidth: 1,
    borderRadius: 30,
  },
  generateMoreCard: {
    backgroundColor: "#5F5AA2",
    width: "100%",
    height: 180,
    borderWidth: 1,
    borderBottomEndRadius: 30,
    borderTopStartRadius: 30,
    justifyContent: "space-between",
    padding: 30,
  },
  generateMoreCardText: {
    fontSize: 20,
    color: "#000",
    fontWeight: 800,
  },
});
