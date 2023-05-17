import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OnboardingItem from '../../components/onboard/OnboardingItem';
import Pagination from '../../components/onboard/Pagination';
import Onboard from '../../interfaces/Onboard';
import { useTranslation } from 'react-i18next';

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
  // const {t} = useTranslation();
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
      {currentIndex <= 2 ? (
        <View style={styles.footerWrapper}>
          <Pagination datas={Onboard} currentIndex={currentIndex} />
          <TouchableOpacity style={styles.btn} onPress={nextHandler}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.btnGetStartedWrapper}>
          <TouchableOpacity style={styles.btnGetStarted} onPress={nextHandler}>
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  footerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    alignItems: 'center',
  },
  btn: {
    width: 163,
    height: 50,
    backgroundColor: '#018CF1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#F6F6F6',
    fontSize: 16,
    fontWeight: '500',
  },
  btnGetStarted: {
    width: "95%",
    height: 50,
    backgroundColor: '#018CF1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGetStartedWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  }
});
