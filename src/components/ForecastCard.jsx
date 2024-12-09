import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";

const ForecastCard = ({
  unit,
  item,
  dayName,
}) => {
  const date = new Date(item.date);
  const displayDay =
    dayName ||
    date.toLocaleDateString("en-US", { weekday: "long" }).split(",")[0];
  return (
    <View className="flex items-center justify-center space-y-4 bg-white/15 rounded-3xl h-[180px] backdrop-blur-sm transition-all duration-300 hover:bg-white/20 p-4">
      <Image
        source={{ uri: `https:` + item?.day?.condition?.icon }}
        style={{
          width: 80,
          height: 80,
        }}
        resizeMode="cover"
        className="transition-transform duration-300 d hover:scale-105"
      />
      <View className="space-y-1">
        <Text className="text-base text-center text-white">{item.date}</Text>
        <Text className="text-sm text-center text-white text-">
          {displayDay}
        </Text>
        <Text className="text-xl font-semibold text-center text-white">
          {unit
            ? `${Math.round(item?.day?.avgtemp_c)}°`
            : `${Math.round(item?.day?.avgtemp_f)} F `}
        </Text>
      </View>
    </View>
  );
};

export default ForecastCard;
