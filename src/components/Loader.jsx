import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const Loader = () => {
  return (
    <View className="flex-row items-center justify-center flex-1">
      <Progress.Circle thickness={10} size={40} color="#0bb1b2" />
    </View>
  );
};

export default Loader;
