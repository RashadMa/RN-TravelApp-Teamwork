import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

interface WeatherData {
      name: string;
      main: {
            temp: number;
      };
      sys: {
            country: string;
      };
      weather: {
            main: string;
            icon: string;
      }[];
}

interface WeatherProps {
      city: string;
}

const Weather: React.FC<WeatherProps> = ({ city }) => {
      const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

      useEffect(() => {
            const fetchWeatherData = async () => {
                  try {
                        const response = await axios.get<WeatherData>(
                              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fce019f9bb43a43436e8738b6c5d9fb&units=metric`
                        );
                        setWeatherData(response.data);
                  } catch (error) {
                        console.error(error);
                  }
            };

            fetchWeatherData();
      }, [city]);

      return (
            <View>
                  {weatherData ? (
                        <>
                              <View style={styles.weatherWrapper}>
                                    <View style={{ width: 240, height: 35, backgroundColor: "#262626", borderRadius: 10, justifyContent: 'center', paddingLeft: 10 }}>
                                          <Text style={styles.weatherCity}>📍  {weatherData.name}, {weatherData.sys.country}</Text>
                                    </View>
                                    {weatherData.weather.map((condition) => (
                                          <View style={styles.deg} key={condition.main}>
                                                <Image
                                                      source={{ uri: `https://openweathermap.org/img/w/${condition.icon}.png` }}
                                                      style={{ width: 30, height: 30 }}
                                                />
                                                <Text style={styles.weatherData}> {weatherData.main.temp}°C</Text>
                                          </View>
                                    ))}
                              </View>

                        </>
                  ) : (
                        <Text>Loading weather data...</Text>
                  )}
            </View>
      );
};

export default Weather;

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
            width: 110,
            height: 35,
            backgroundColor: "#262626",
            borderRadius: 10,
            paddingLeft: 10
      }

})