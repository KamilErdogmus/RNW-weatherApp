// Loader.js
import { View, Platform } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const WebLoader = () => (
  <div className="flex items-center justify-center flex-1">
    <div className="web-progress-circle" />
  </div>
);

const NativeLoader = () => (
  <View className="flex-row items-center justify-center flex-1">
    <Progress.Circle thickness={10} size={40} color="#0bb1b2" />
  </View>
);

const Loader = () => {
  return Platform.OS === 'web' ? <WebLoader /> : <NativeLoader />;
};

export default Loader;