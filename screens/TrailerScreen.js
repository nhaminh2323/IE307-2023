import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { getYoutubeUrl, fetchVideoMovies } from '../api/moviedb'; // Adjust imports based on your actual file structure
import { Header } from '../components/header';
import { AuthContext } from '../AuthContext';

const { width } = Dimensions.get('window');

const TrailerScreen = () => {
  const { params } = useRoute();
  const [videoMovies, setVideoMovies] = useState([]);
  const { language } = useContext(AuthContext);

  useEffect(() => {
    getVideoMovies(params.id, language);
  }, [params.id, language]);

  const getVideoMovies = async (id, language) => {
    const data = await fetchVideoMovies(id, language);
    console.log('got video trailer movies');
    if (data && data.results) {
      setVideoMovies(data.results);
    }
  };

  // Filter trailers and teasers
  const trailers = videoMovies.filter((video) => video.type === 'Trailer');
  const teasers = videoMovies.filter((video) => video.type === 'Teaser');

  const renderItem = ({ item, index }) => (
    <WebView
      key={`${item.type.toLowerCase()}_${index}`}
      source={{ uri: getYoutubeUrl(item.key) }}
      style={styles.webView}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Trailer" hideSearch={true} />

      <FlatList
        data={videoMovies}
        keyExtractor={(item, index) => `${item.type.toLowerCase()}_${index}`}
        renderItem={renderItem}
        style={styles.videoContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    marginTop: 10,
  },
  webView: {
    width: width,
    height: width * 9 / 16,
    marginBottom: 20,
  },
});

export default TrailerScreen;