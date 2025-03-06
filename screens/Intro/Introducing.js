import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

const CONTENT = [
  {
    title: 'About Us',
    content:
      '1. The Movit Advantages: \n - Multi-platform \n - Multi-device \n - Online Interaction \n2. Features of Movit: \n - Personalizing Content Suggestion \n - Personalizing Enjoy Experience \n - Saving Favorite \n - Multi-language \n - Multi-subtitle \n - Highlight Reviews \n - Download to go',
  },
  {
    title: 'Subscription',
    content:
      'Customers can subscribe to one of three plans; the difference in plans relates to video resolution, the number of simultaneous streams, and the number of devices to which content can be downloaded.\n1. Basic: \n - Watch on 1 supported device at a time \n - Watch in HD \n - Download on 1 supported device at a time \n2. Standard: \n - Unlimited ad-free \n - Watch on 2 supported devices at a time \n - Watch in HD \n - Download on 2 supported devices at a time \n3. Premium: \n - Unlimited ad-free \n - Watch on 5 supported devices at a time \n - Watch in HD \n - Download on 5 supported devices at a time',
  },
  {
    title: 'Contact',
    content: 'Emails: Movit@mail.com \nHotline: 123 *** ****  \nWebsite: https://www.movit.com/',
  },
];

const IntroSection = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleSection = () => {
    setIsActive(!isActive);
  };

  return (
    <View style={styles.userIntroHeader}>
      <TouchableOpacity onPress={toggleSection}>
        <Text style={[styles.select, isActive ? styles.active2 : styles.inactive]}>{title}</Text>
      </TouchableOpacity>
      {isActive && (
        <Text style={[styles.content, isActive ? styles.active : styles.inactive]}>{content}</Text>
      )
      }
    </View>
  );
};

const Introducing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo0.5.png')}
        style={styles.logo}
      />
      <ScrollView>
        {CONTENT.map((section, index) => (
          <IntroSection key={index} title={section.title} content={section.content} />
        ))}
      </ScrollView>

      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.selectbtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.selectnav}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectbtn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.selectnav}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  containerMain: {
    color: '#ffffff',
    alignItems: 'center',
  },
  containerView: {
    // flex: 1,
    // margin: 10,
    alignItems: 'center',
  },
  rowButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 30,
    marginVertical: 50,
  },
  select: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#c60a20',
    padding: 15,
  },
  selectbtn: {
    backgroundColor: theme.mainColor,
    borderRadius: 20,
    width: 130,
  },
  selectnav: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    padding: 15,
  },
  selector: {
    fontSize: 15,
    color: '#ffffff',
    padding: 5,
    textAlign: 'justify',
  },
  content: {
    margin: 5,
    padding: 20,
    color: '#ffffff',
    lineHeight: 20,
    fontSize: 16,
  },
  active: {
    backgroundColor: '#1c1c1c',
    color: '#ffffff',
    borderRadius: 25,
  },
  inactive: {
    backgroundColor: '#0c0c0c',
    color: '#ffffff',
  },
  active2: {
    backgroundColor: '#0c0c0c',
    fontStyle: 'italic',
    color: '#c60a20',
  },
  userIntroHeader: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: '50%',
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  }
});

export default Introducing;