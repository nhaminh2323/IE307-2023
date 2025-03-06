import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { WebView } from 'react-native-webview';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text, FlatList } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { Header } from '../components/header';
import { AuthContext } from '../AuthContext';
import { getYoutubeUrl, getSmashystreamUrl, getSuperembedUrl, get2embedUrl, fetchMovieDetails, fetchReviewsMovies, fallbackPersonImage, image185, fetchVideoMovies } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

const VideoScreen = () => {
  const { params } = useRoute();
  const { language } = useContext(AuthContext);
  const isVietnamese = language === 'vi';
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(1);
  const [page, setPage] = useState(1);

  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState([]);

  useEffect(() => {
    getMovieDetials(params.id, language);
    getMovieReviews(params.id, language, page);
    setLoading(false);
  }, [params.id, language, page]);

  const getMovieDetials = async (id, language) => {
    const data = await fetchMovieDetails(id, language);
    console.log('got movie details');
    if (data) setMovie(data);
  };

  const getMovieReviews = async (id, language, page) => {
    const data = await fetchReviewsMovies(id, language, page);
    console.log('got movie reviews');
    if (data) {
      setReviews(data.results);
      setTotalReviews(data.total_results);
    }
  };

  const renderContent = () => {
    switch (selectedServer) {
      case 1:
        return <WebView source={{ uri: getSmashystreamUrl(params.id) }} style={styles.webView} />;
      case 2:
        return <WebView source={{ uri: getSuperembedUrl(params.id) }} style={styles.webView} />;
      default:
        return null;
    }
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: image185(item.author_details.avatar_path) || fallbackPersonImage }} style={styles.avatar} />
        <Text style={styles.reviewAuthor}>{item.author}</Text>
        {/* <Text style={styles.reviewRating}>{item.author_details.rating}⭐</Text> */}
        <Text style={styles.reviewTime}>{item.created_at}</Text>
      </View>
      <Text style={styles.reviewText}>{item.content}</Text>
    </View>
  );

  // const renderReviewItem = ({ item }) => {
  //   const [expanded, setExpanded] = useState(false);

  //   const toggleExpansion = () => {
  //     setExpanded(!expanded);
  //   };

  //   return (
  //     <View style={styles.reviewItem}>
  //       <View style={styles.reviewHeader}>
  //         <Image source={{ uri: image185(item.author_details.avatar_path) || fallbackPersonImage }} style={styles.avatar} />
  //         <Text style={styles.reviewAuthor}>{item.author}</Text>
  //         <Text style={styles.reviewRating}>{item.author_details.rating}⭐</Text>
  //         {/* <Text style={styles.reviewTime}>{item.created_at}</Text> */}
  //       </View>
  //       <TouchableOpacity onPress={toggleExpansion}>
  //         <Text style={styles.reviewText} numberOfLines={expanded ? 0 : 3}>
  //           {item.content}
  //         </Text>
  //       </TouchableOpacity>
  //       {expanded && (
  //         <TouchableOpacity onPress={toggleExpansion}>
  //           <Text style={styles.readLess}>Read Less</Text>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   );
  // };
  
  return (
    <View style={styles.container}>
      <Header title={movie.title} hideSearch={true} />

      {/* Video Player */}
      <View style={styles.playerContainer}>
        {renderContent()}
      </View>

      {/* Server Switch */}
      <View style={styles.serverContainer}>
        <TouchableOpacity style={[styles.serverItem, selectedServer === 1 && styles.selectedServer]} onPress={() => setSelectedServer(1)}>
          <Text style={styles.serverText}>Server 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.serverItem, selectedServer === 2 && styles.selectedServer]} onPress={() => setSelectedServer(2)}>
          <Text style={styles.serverText}>Server 2</Text>
        </TouchableOpacity>
      </View>
      
      {/* Reviews */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewTitle}>{isVietnamese ? "Bình luận" : "Comments"} ({totalReviews})</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReviewItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  buttonBack: {
    position: 'absolute',
    top: 30,
    left: 20,
    borderRadius: 10,
    padding: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  webView: {
    // flex: 1,
    width: width,
    // height: width * 16 / 9,
    // aspectRatio: 16 / 9,
  },
  playerContainer: {
    flex: 1,
  },
  serverContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  serverItem: {
    marginHorizontal: 10,
    padding: 10,
    borderColor: theme.mainColor,
    borderWidth: 2,
    borderRadius: 10,
  },
  selectedServer: {
    backgroundColor: theme.mainColor,
  },
  serverText: {
    color: 'white',
    fontSize: 16,
  },
  reviewsContainer: {
    flex: 1,
    marginHorizontal: 5,
    // marginTop: 10,
  },
  reviewTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  reviewItem: {
    backgroundColor: theme.subBackground,
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  reviewAuthor: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  reviewRating: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
  reviewTime: {
    color: theme.grayColor,
    fontSize: 16,
  },
  reviewText: {
    color: 'white',
    fontSize: 16,
    // textAlign: 'justify',
  },
  readLess: {
    color: 'blue',
    marginTop: 5,
  },
});

export default VideoScreen;