import {
  View,
  Image,
  useWindowDimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, Feather } from "@expo/vector-icons/";
import { debounce } from "lodash";
import { getData, setData } from "./src/utils/asyncStorage";
import Forecasts from "./src/components/Forecasts";
import { fetchLocations, fetchWeatherForecast } from "./src/services/api";
import Loader from "./src/components/Loader";

export default function App() {
  const { width, height } = useWindowDimensions();
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";
  const isWeb = Platform.OS === "web";

  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedCity, setSavedCity] = useState("Ankara");
  const [weather, setWeather] = useState({
    current: {},
    location: {},
    forecast: { forecastday: [] },
  });
  const { current, location, forecast } = weather ?? {};

  const imageStyle = {
    width,
    height: isMobile ? height * 1.2 : height,
  };

  const handleLoc = (loc) => {
    setLoading(true);
    setLocations([]);
    setShowSearch(false);
    fetchWeatherForecast({ cityName: loc.name, days: "10" }).then((data) => {
      setWeather(data);
      setLoading(false);
      setData("city", loc.name);
    });
  };

  const handleSearch = (query) => {
    if (query.trim().length > 2) {
      fetchLocations({ cityName: query || "Ankara" }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    const getSavedCity = async () => {
      const city = await getData("city");
      if (city) {
        setSavedCity(city);
        fetchWeatherForecast({ cityName: city, days: "10" })
          .then((data) => {
            setLoading(false);
            setWeather(data);
          })
          .catch((error) => {
            console.error("Error fetching weather:", error);
            setLoading(false);
          });
      } else {
        fetchWeatherForecast({ cityName: "Ankara", days: "10" })
          .then((data) => {
            setLoading(false);
            setWeather(data);
          })
          .catch((error) => {
            console.error("Error fetching weather:", error);
            setLoading(false);
          });
      }
    };

    getSavedCity();

    return () => {
      handleTextBounce.cancel();
    };
  }, []);

  const handleTextBounce = useCallback(debounce(handleSearch, 1200), []);

  return (
    <SafeAreaProvider className="inset-0 p-0 m-0">
      <View className="relative flex-1">
        <StatusBar style="light" />
        <Image
          blurRadius={90}
          className="absolute inset-0 w-full h-full"
          style={imageStyle}
          resizeMode={isMobile ? "cover" : "stretch"}
          source={require("./assets/images/bg.png")}
        />
        {loading ? (
          <Loader />
        ) : (
          <SafeAreaView className="flex-1">
            <View
              style={{ width }}
              className={`
         relative z-50 justify-center
         ${isWeb ? "max-w-[50%] min-w-[400px] mx-auto my-4" : "h-[7%]"}
       `}
            >
              <View
                className={`
              flex-row items-center mx-4 justify-end rounded-full
              ${showSearch ? "bg-white/20" : "bg-transparent"}
              ${isWeb ? "p-3" : "p-1"}
            `}
              >
                {showSearch ? (
                  <TextInput
                    className={`flex-1   pl-6 align-middle  text-white ${
                      isWeb ? "text-xl h-8" : "text-lg h-12"
                    }`}
                    placeholder="Search City"
                    onChangeText={handleTextBounce}
                    placeholderTextColor={"lightgray"}
                  />
                ) : null}
                <TouchableOpacity
                  onPress={() => setShowSearch(!showSearch)}
                  className={`${
                    isWeb ? "m-1 " : ""
                  } p-3 rounded-full bg-white/40`}
                >
                  <FontAwesome6
                    name="magnifying-glass"
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>
              </View>

              {locations.length > 0 && showSearch ? (
                <View
                  className={`
                 absolute bg-gray-300 top-[72] rounded-3xl
                 ${isWeb ? "w-full" : "mx-4 w-[93%]"}
               `}
                >
                  {locations.map((loc, index) => {
                    const isLast = index + 1 === locations.length;
                    return (
                      <TouchableOpacity
                        onPress={() => handleLoc(loc)}
                        key={index}
                        className={`flex-row items-center border-0 p-3 px-4 mb-1 w-full ${
                          !isLast ? "border-b-2 border-b-gray-400" : ""
                        } `}
                      >
                        <Feather name="map-pin" size={20} color="gray" />
                        <Text className="ml-2 text-lg text-black">
                          {loc?.name},{loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <Forecasts
              current={current ?? {}}
              location={location ?? {}}
              forecast={forecast ?? { forecastday: [] }}
            />
          </SafeAreaView>
        )}
      </View>
    </SafeAreaProvider>
  );
}
