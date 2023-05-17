import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemeContext, Theme } from '../../context/ThemeContext';

const App: React.FC = () => {
      const { theme, toggleTheme } = useContext(ThemeContext);

      const containerStyles = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
      };

      const buttonStyles = {
            backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
      };
      
      return (
            <View style={containerStyles}>
                  <TouchableOpacity onPress={toggleTheme} style={buttonStyles}>
                        {theme === 'dark' ? <Image source={require('../../assets/icons/moon.png')} style={buttonStyles}
                        /> : <Image source={require('../../assets/icons/Sun.png')} style={buttonStyles}
                        />}
                  </TouchableOpacity>
            </View>
      );
};

export default App;

const styles = StyleSheet.create({

})
