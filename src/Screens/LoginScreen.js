import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

import { useState } from "react";
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'; 
const backImage = require("../../assets/background_signin.jpg");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
    <KeyboardAwareScrollView className='bg-black'>
      <View>
        <Image source={backImage} className="object-cover h-80 w-full" />
      </View>
      <View className="bg-white h-screen rounded-t-3xl">
        <Text className="text-[#d60e45] text-3xl font-semibold text-center py-5">
          Sign In{" "}
        </Text>
        <View className='d-flex justify-center items-center'>
        <TextInput
          className="tracking-widest
           bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-3 mb-5"
          placeholder="Enter your email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="tracking-widest bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-3 mb-5"
          placeholder="Enter Password"
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity className=' bg-[#fac25a] py-2 rounded-md mx-10 mt-16 mb-3'>
        <Text className='text-center font-semibold text-white text-lg '>Login</Text>
      </TouchableOpacity>
      <View className="flex-row space-x-2 justify-center">
        <Text>Don't have an account?</Text>
        <TouchableOpacity>
          <Text className='text-[#d60e45] font-medium'>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </View>
      </KeyboardAwareScrollView>
      
    </>
  );
};

export default LoginScreen;
