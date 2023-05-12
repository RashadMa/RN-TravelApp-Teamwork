import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useRef, useState} from 'react';
import OnboardingItem from '../../components/onboard/OnboardingItem';
import {Button} from 'react-native-paper';
import Onboard from '../../interfaces/Onboard';
import Pagination from '../../components/onboard/Pagination';

const OnboardScreen = ({navigation}) => {
  const nextHandler = () => {
    if (Onboard.length - 1 !== currentIndex) {
      slidersRef.current.scrollToIndex({index: currentIndex + 1});
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('CategoryList');
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const slidersRef = useRef(null);
  console.log(slidersRef.current);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Onboard}
        ref={slidersRef}
        renderItem={OnboardingItem}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View>
        <Pagination datas={Onboard} currentIndex={currentIndex} />
      </View>
      <Button onPress={nextHandler}>Next</Button>
    </SafeAreaView>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
});
