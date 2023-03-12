import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";

import { useLayoutEffect } from "react";
const userAvatar = require("../../assets/man.png");
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, chatRef, userRef } from "../../firebase/config";

const HomeScreen = () => {
  const navigation = useNavigation();
  const {user, userAvatarUrl, setUserAvatarUrl} = useContext(AuthenticatedUserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {!userAvatarUrl ? (
            <Image source={userAvatar} className="h-10 w-10" />
          ) : (
            <Image
              source={{ uri: userAvatarUrl }}
              className="h-10 w-10 rounded-full"
            />
          )}
        </TouchableOpacity>
      ),
    });
  }, [userAvatarUrl]);
  useEffect(() => {
    if (!user) return;
     const queryResult = query(userRef, where("email", "==", user.email));
     async function DocFinder(queryResult) {
       const querySnapshot = await getDocs(queryResult);
       querySnapshot.forEach((doc) => {
         if (username === "") {
           const {profilePic } = doc.data();
           setUsername(username);
           setUserEmail(email);
           setUserAvatarUrl(profilePic);
           setUserImageUrl(profilePic);
         }
       });
     }
  },[]);

  return (
    <View className="flex-1">
      <View className="flex-row-reverse absolute bottom-14 right-5">
        <TouchableOpacity onPress={() => navigation.navigate("Search")} className="bg-orange-500 h-16 w-16 rounded-full text-center items-center justify-center">
        <Entypo name="chat" size={40} color="white" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default HomeScreen;
