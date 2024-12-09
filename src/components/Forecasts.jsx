import {
  View,
  Text,
  Image,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useMemo, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ForecastCard from "./ForecastCard";

const Forecasts = ({ current, location, forecast }) => {
  const [unit, setUnit] = useState(true);
  const { width } = useWindowDimensions();
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";

  const imageStyle = useMemo(
    () => ({
      width: isMobile ? width * 0.6 : width * 0.25,
      height: isMobile ? width * 0.6 : width * 0.25,
      minWidth: isMobile ? 100 : 200,
      minHeight: isMobile ? 100 : 200,
      maxWidth: isMobile ? 400 : 300,
      maxHeight: isMobile ? 400 : 300,
    }),
    [width, isMobile]
  );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    swipeToSlide: true,
    draggable: true,
    touchThreshold: 10,
    swipe: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <View className="flex-col justify-around flex-1 mx-4">
      <View className="flex-row items-center justify-center">
        <Text className="text-3xl font-bold text-white">
          {location?.name},{" "}
          <Text className="text-xl font-semibold text-gray-300">
            {location?.country}
          </Text>
        </Text>
      </View>

      <View
        className={`
          flex-row justify-center items-center
        `}>
        <Image
          source={{ uri: `https:${current?.condition?.icon}` }}
          resizeMode="cover"
          style={imageStyle}
          className="items-start object-contain"
        />
      </View>

      <View className="space-y-1">
        <Pressable onPress={() => setUnit(!unit)}>
          <Text
            style={{ fontSize: 70 }}
            className="ml-5 font-bold text-center text-white"
          >
            {unit
              ? `${Math.round(current?.temp_c)}°`
              : `${Math.round(current?.temp_f)}F`}
          </Text>
        </Pressable>
        <Text className="mb-2 ml-5 text-2xl font-bold text-center text-white">
          {current?.condition?.text}
        </Text>

        <View
          className={`flex-row mb-2 justify-between mx-4 ${
            !isMobile ? "max-w-[50%] min-w-[400px] mx-auto" : "h-[7%]"
          }`}
        >
          <View className="flex-row items-center space-x-2">
            <Image
              source={require("../../assets/icons/wind.png")}
              style={{ width: 24, height: 24, marginRight: 6 }}
              resizeMode="cover"
            />
            <Text className="text-lg font-semibold text-white">
              {Math.round(current?.wind_kph)}km
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <Image
              source={require("../../assets/icons/drop.png")}
              style={{ width: 24, height: 24, marginRight: 6 }}
              resizeMode="cover"
            />
            <Text className="text-lg font-semibold text-white">
              {Math.round(current?.humidity)}%
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <Image
              source={require("../../assets/icons/sun.png")}
              style={{ width: 24, height: 24, marginRight: 6 }}
              resizeMode="cover"
            />
            <Text className="text-lg font-semibold text-white">
              {forecast?.forecastday[0]?.astro?.sunrise}
            </Text>
          </View>
        </View>

        <View
          className={`space-y-1 ${
            isMobile ? "" : "w-[50%] mx-auto flex items-center justify-between"
          }`}
        >
          <View className="flex-row items-center mx-5 my-6 space-x-2">
            <FontAwesome name="calendar" size={22} color="white" />
            <Text className="ml-4 text-base text-white">Daily Forecast</Text>
          </View>

          {isMobile ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15, columnGap: 12 }}
            >
              {forecast?.forecastday?.map((item, index) => (
                <ForecastCard unit={unit} item={item} key={index} />
              ))}
            </ScrollView>
          ) : (
            <View className="w-full max-w-[1600px] min-w-[250px] mx-auto px-4">
              <Slider {...sliderSettings}>
                {forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];
                  return (
                    <View key={index} className="px-2">
                      <ForecastCard
                        dayName={dayName}
                        item={item}
                        unit={unit}
                      />
                    </View>
                  );
                })}
              </Slider>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Forecasts;