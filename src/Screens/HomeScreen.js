import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useLayoutEffect } from "react";
const userAvatar = require("../../assets/man.png");
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={userAvatar} className="h-10 w-10" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return <View></View>;
};

export default HomeScreen;
