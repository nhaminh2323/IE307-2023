import React, { useCallback, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, searchMovies, searchPeople } from '../api/moviedb';
import { debounce } from 'lodash';
import Loading from '../components/loading';
import MoviePreview from '../components/moviePreview';
import CastPreview from '../components/castPreview';
import { Mainstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const { language } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [resultsMovie, setResultsMovie] = useState([]);
  const [resultsCast, setResultsCast] = useState([]);
  const [searchType, setSearchType] = useState('movie');

  const isVietnamese = language === 'vi';

  const handleSearch = search => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: language,
        page: '1'
      }).then(data => {
        console.log('got search movie results');
        setLoading(false);
        if (data && data.results) setResultsMovie(data.results);
      });
      
      searchPeople({
        query: search,
        include_adult: false,
        language: language,
        page: '1'
      }).then(data => {
        console.log('got search cast results');
        setLoading(false);
        if (data && data.results) setResultsCast(data.results);
      });
    } else {
      setLoading(false);
      setResultsMovie([]);
      setResultsCast([]);
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleSearchTypeChange = newSearchType => {
    // Clear results when switching search type
    // setResultsMovie([]);
    // setResultsCast([]);
    setSearchType(newSearchType);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* search input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder={isVietnamese ? "Tìm kiếm Phim/Diễn viên" : "Search Movie/Cast"}
          placeholderTextColor={'lightgray'}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* search type buttons */}
      <View style={styles.resultsContainer}>
        <TouchableOpacity
          style={[styles.resultItem, searchType === 'movie' && styles.selectedResult]}
          onPress={() => handleSearchTypeChange('movie')}
        >
          <Text style={styles.resultText}>{isVietnamese ? "Phim" : "Movie"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resultItem, searchType === 'cast' && styles.selectedResult]}
          onPress={() => handleSearchTypeChange('cast')}
        >
          <Text style={styles.resultText}>{isVietnamese ? "Diễn viên" : "Cast"}</Text>
        </TouchableOpacity>
      </View>

      {/* search results */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {searchType === 'movie' ? (
            resultsMovie.length > 0 ? (
              <MoviePreview results={resultsMovie} hideResults={'false'} />
            ) : (
              <View style={styles.noResultsContainer}>
                <Image
                  source={require('../assets/images/movieTime.png')}
                  style={styles.noResultsImage}
                />
              </View>
            )
          ) : (
            resultsCast.length > 0 ? (
              <CastPreview results={resultsCast} hideResults={'false'} />
            ) : (
              <View style={styles.noResultsContainer}>
                <Image
                  source={require('../assets/images/movieTime.png')}
                  style={styles.noResultsImage}
                />
              </View>
            )
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    margin: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 20,
  },
  input: {
    paddingBottom: 1,
    paddingLeft: 6,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  iconContainer: {
    borderRadius: 20,
    padding: 9,
    margin: 1,
    backgroundColor: '#8a8a8a',
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  resultText: {
    color: 'white',
    fontWeight: '600',
    // marginLeft: 16,
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 20,
    // flexWrap: 'wrap',
  },
  resultItem: {
    borderColor: theme.mainColor,
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  selectedResult: {
    backgroundColor: theme.mainColor,
  },
  image: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 12,
  },
  title: {
    color: '#d3d3d3',
    marginLeft: 16,
  },
  noResultsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noResultsImage: {
    height: 250,
    width: 250,
  },
});