import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemeContext, Theme } from '../../context/ThemeContext';

const App: React.FC = () => {
      const { theme, toggleTheme } = useContext(ThemeContext);

      const containerStyles = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
      };

      const textStyles = {
            color: theme === 'dark' ? '#fff' : '#1c1c1c',
      };

      const buttonStyles = {
            marginTop: 20,
            padding: 10,
            backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
      };

      const buttonTextStyles = {
            color: theme === 'dark' ? '#1c1c1c' : '#fff',
      };

      return (
            <View style={containerStyles}>
                  <Text style={textStyles}>Hello, world!</Text>
                  <TouchableOpacity onPress={toggleTheme} style={buttonStyles}>
                        {/* <Text style={buttonTextStyles}>
                              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode

                        </Text> */}
                        <Image source={require('../../assets/icons/Sun.png') } style={buttonStyles}
                        />
                  </TouchableOpacity>
            </View>
      );
};

export default App;

const styles = StyleSheet.create({
      
    })
