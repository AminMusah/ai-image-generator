import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

export const icons = {
  index: (props) => <AntDesign name="home" size={26} {...props} />,
  //   explore: (props) => <Feather name="compass" size={26} {...props} />,
  //   create: (props) => <AntDesign name="pluscircleo" size={26} {...props} />,
  favorite: (props) => <FontAwesome name="heart" size={26} {...props} />,
};
