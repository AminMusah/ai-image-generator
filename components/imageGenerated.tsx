import { Entypo, Feather } from "@expo/vector-icons";
import { StyleSheet, Image, View } from "react-native";
import Text from "./CustomText";

interface ImageGeneratedProps {
  toggle: boolean;
  image: { id: number; url: string; description: string };
  height: any;
}

export default function ImageGenerated({
  toggle,
  image,
  height,
}: ImageGeneratedProps) {
  return (
    <View
      style={{
        height,
        paddingVertical: toggle ? 35 : 0,
        paddingHorizontal: toggle ? 15 : 0,
      }}
    >
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
      <Text style={{ color: "#000" }}>{image.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 30,
  },
  actionsContainer: {
    position: "absolute",
    bottom: 50,
    right: 30,
  },
  action: {
    marginBottom: 20,
  },
});
