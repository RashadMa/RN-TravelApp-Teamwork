import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
      const [weather, setWeather] = useState<any>(null);
      const [loading, setLoading] = useState<boolean>(true);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const position = await getCurrentPosition();
                        const { latitude, longitude } = position.coords;
                        const apiKey = '6fce019f9bb43a43436e8738b6c5d9fb';

                        const response = await axios.get(
                              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                        );

                        setWeather(response.data);
                        setLoading(false);
                  } catch (error) {
                        console.error(error);
                        setLoading(false);
                  }
            };

            fetchData();
      }, []);

      const getCurrentPosition = (): Promise<Geolocation.GeoPosition> => {
            return new Promise((resolve, reject) => {
                  Geolocation.getCurrentPosition(
                        (position) => resolve(position),
                        (error) => reject(error),
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                  );
            });
      };

      if (loading) {
            return <Text style={{ color: "#fff" }}>Loading...</Text>;
      }

      if (!weather) {
            return <Text>Unable to fetch weather data.</Text>;
      }

      const getWeatherIconName = (weatherCondition: string | undefined): string => {
            switch (weatherCondition) {
                  case 'Clear':
                        return '☀️';
                  case 'Clouds':
                        return '🌤️';
                  case 'Rain':
                        return '🌧️';
                  case 'Snow':
                        return '🌨️';
                  default:
                        return 'question-circle';
            }
      };

      if (!weather) {
            return <Text>Unable to fetch weather data.</Text>;
      }

      const {
            name: cityName,
            sys: { country: countryName } = {},
            main: { temp} = {},
            weather: weatherDetails
          } = weather || {};

      const weatherCondition = weatherDetails[0]?.main;
      const weatherIconName = getWeatherIconName(weatherCondition);
      return (
            <View>
                  <View style={styles.weatherWrapper}>
                        <View style={{ width: "65%", height: 35, backgroundColor: "#262626", borderRadius: 10, justifyContent: 'center', paddingLeft: 10 }}>
                              <Text style={styles.weatherCity}>📍  {cityName}, {countryName}</Text>
                        </View>
                        <View style={styles.deg}>
                              <Text style={styles.weatherData}>{weatherIconName}</Text>
                              <Text style={styles.weatherData}> {temp}°C</Text>
                        </View>
                  </View>
            </View>
      );
};

export default App;

const styles = StyleSheet.create({
      weatherWrapper: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
      },
      weatherCity: {
            fontSize: 16,
            fontWeight: '400',
            color: '#fff',
      },
      weatherData: {
            fontSize: 16,
            fontWeight: '400',
            color: '#fff',
      },
      deg: {
            alignItems: 'center',
            flexDirection: 'row',
            width: "30%",
            height: 35,
            backgroundColor: "#262626",
            borderRadius: 10,
            paddingLeft: 10
      }
})