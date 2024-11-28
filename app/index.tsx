import { Image, StyleSheet, View, TextInput, ScrollView } from "react-native";
import { Link } from "expo-router";
import Text from "@/components/CustomText";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heroText}>Generate images</Text>
      <View style={styles.subContainer}>
        <View style={styles.wrapper}>
          <Text style={styles.wrapperText}>Provide a phrase</Text>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            // onChangeText={(value) => handleCustomerSearch(value)}
            placeholder="prompt to generate an image"
          />
          <View style={{ position: "absolute", right: 10, bottom: "20%" }}>
            <MaterialIcons name="token" size={24} color="black" />
          </View>
        </View>
        <View style={styles.hompageImageContainer}>
          <View style={styles.hompageImageSubContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/images/image2.webp")}
                resizeMode="cover"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/images/image3.webp")}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={styles.hompageImageSubContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/images/image1.webp")}
                resizeMode="cover"
              />
            </View>
            <View style={styles.imageContainer}>
              <Link href={"/feed"} style={{ height: "100%" }}>
                <View style={styles.generateMoreCard}>
                  <Text style={styles.generateMoreCardText}>Generate more</Text>
                  <MaterialIcons name="arrow-forward" size={24} color="black" />
                </View>
              </Link>
            </View>
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
    paddingHorizontal: 10,
    paddingLeft: 30,
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
