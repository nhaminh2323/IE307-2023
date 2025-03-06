import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fallbackPersonImage, image185 } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import { Mainstyles } from '../theme';
import { AuthContext } from '../AuthContext';

const { width, height } = Dimensions.get('window');

const CastPreviewItem = ({ index, person }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate('Person', person)}
      style={styles.castItem}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image185(person?.profile_path) || fallbackPersonImage,
          }}
        />
      </View>

      <Text style={styles.nameText}>
        {person?.name && person.name.length > 10
          ? person.name.slice(0, 10) + '...'
          : person?.name}
      </Text>
    </TouchableOpacity>
  );
};

const CastPreview = ({ results, hideResults }) => {
    const { language } = useContext(AuthContext);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      {hideResults && (
        <Text style={styles.resultText}>
            {language === 'vi' ? 'Kết quả' : 'Results'} ({results.length})
        </Text>
      )}
      <View style={styles.resultsContainer}>
        {results.map((item, index) => (
          <CastPreviewItem key={index} person={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
  },
  resultText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 5,
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nameText: {
    color: 'white',
    fontSize: 16,
  },
  castItem: {
    marginHorizontal: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 130,
    height: 130,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 130,
  },
});

export default CastPreview;