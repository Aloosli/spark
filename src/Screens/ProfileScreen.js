import { View, Text, Button, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { AuthenticatedUserContext } from "../../Context/AuthenticationContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function DocFinder(queryResult) {
    const querySnapshot = await getDocs(queryResult);
    querySnapshot.forEach((doc) => {
      if (username === "") {
        const { username, email } = doc.data();
        setUsername(username);
        setUserEmail(email);
      }
    });
  }

  useEffect(() => {
    if (!user) return;
    const userRef = collection(db, "users");
    const queryResult = query(userRef, where("email", "==", user.email));
    DocFinder(queryResult);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  // Capitalize the first letter of the username
  const capitalizedUsername =
    username.charAt(0).toUpperCase() + username.slice(1);
  return (
    <View>
      <View className="justify-center items-center my-5">
        <Text className="text-2xl font-medium tracking-widest">
          Welcome, <Text className="text-[#d60e45]">{capitalizedUsername}</Text>
          !
        </Text>
      </View>
      <TouchableOpacity className="rounded-md bg-gray-400 items-center justify-center mx-20 mb-10">
        <Ionicons name="ios-camera" size={50} color="white" />
      </TouchableOpacity>
      <View className="justify-center items-center">
        <Text className="text-center text-lightgray tracking-widest bg-gray-200 rounded-lg w-80 mb-3 text-base py-2 px-1 mx-3 font-light ">
          {username}
        </Text>
        <Text className="text-center text-lightgray tracking-widest bg-gray-200 rounded-lg w-80 text-base py-2 px-1 mx-3 font-light ">
          {userEmail}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleSignOut} className="bg-[#fac25a] py-2 rounded-md mx-20 mt-10 mb-3">
          <Text className="text-center text-white font-semibold text-lg">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
