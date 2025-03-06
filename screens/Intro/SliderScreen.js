import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import { theme } from '../../theme';

const slides = [
  {
    key: '1',
    image: require('../../assets/images/logo0.5.png'),
    text: 'Welcome to MOVIT',
  },
  {
    key: '2',
    image: { uri: 'https://64.media.tumblr.com/f663021092e772ba7a8dddee636c352c/f5fe52098780eae4-02/s1280x1920/120a2f812dab1f4fd9426919400e4d14ba50da33.pnj' },
    text: 'Discover trending movies',
  },
  {
    key: '3',
    image: { uri: 'https://64.media.tumblr.com/5d58c3868f761a4963728b43ab807faa/f5fe52098780eae4-c7/s1280x1920/4f2da079464112ee323f394a3f4a58aa58ab60ee.pnj' },
    text: 'Enjoy watching anytime, anywhere',
  },
  {
    key: '4',
    image: { uri: 'https://64.media.tumblr.com/42364259c4311f0f675e5f18c40c0b73/f5fe52098780eae4-7c/s1280x1920/9a7a61df2c80d5044b6be00ea7de0afe47cb92e7.pnj' },
    text: 'Personalize new contents for you',
  },
];

const SliderScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    navigation.navigate('Introducing');
  };

  const onSkip = () => {
    navigation.navigate('Introducing');
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      activeDotStyle={{ backgroundColor: '#ffffff' }}
      //ấn được vào mấy cái chấm tròn nha
      dotClickEnabled
      showSkipButton
      // dotStyle={{backgroundColor: '#c60a2080'}} // chấm tròn màu đỏ thấy cũng đẹp
      dotStyle={{ backgroundColor: '#ffffff80' }}
      onSkip={onSkip}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c0c0c',
  },
  image: {
    width: 300,
    height: 300,
    margin: 50,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'capitalize',
    padding: 24
  },
});

export default SliderScreen;