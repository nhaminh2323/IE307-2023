import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet, Linking, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, fetchVideoMovies, fetchPersonDetails, image500 } from '../api/moviedb';
import Loading from '../components/loading';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContext';

const topMargin = 20;
const { width, height } = Dimensions.get('window');

export default function DetailScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videoMovies, setVideoMovies] = useState([]);

  const [isFavourite, toggleFavourite] = useState(false);
  const [isWatchLater, toggleWatchLater] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isDescriptions, toggleDescriptions] = useState(false);
  
  const {
    username, language,
    // movie, fetchMovieDetials,
    // cast, fetchMovieCredits,
    // similarMovies, fetchSimilarMovies,
    watchLater, setWatchLaterList,
    laterList, setLaterlist,
    historyFilms, setHistoryFilms,
    favoriteCast, setFavoriteCast
    
    // getWatchLater,
  } = useContext(AuthContext);

  const isVietnamese = language === 'vi';

  useEffect(() => {
    checkMovieInWatchlist(username, item.id);
    // fetchMovieDetials(item.id);
    // fetchMovieCredits(item.id);
    // fetchSimilarMovies(item.id);
    getMovieDetials(item.id, language);
    getMovieCredits(item.id, language);
    getSimilarMovies(item.id, language);
    getVideoMovies(item.id, language);
    setLoading(false);
  }, [item, language]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const results = await Promise.all([
  //         checkMovieInWatchlist(username, item.id),
  //         getMovieDetials(item.id, language),
  //         getMovieCredits(item.id, language),
  //         getSimilarMovies(item.id, language),
  //         getVideoMovies(item.id, language),
  //       ]);
  //       const [checkMovieResult, movieDetailsResult, movieCreditsResult, similarMoviesResult, videoMoviesResult] = results;  
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('An error occurred:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, [item, language]);  

  
  // const fetchData = async () => {
  //   try {
  //     await checkMovieInWatchlist(username, item.id);
  //     await getMovieDetials(item.id, language);
  //     await getMovieCredits(item.id, language);
  //     await getSimilarMovies(item.id, language);
  //     await getVideoMovies(item.id, language);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     // Handle the error appropriately
  //   }
  // };
  
  const getWatchLater = async (username) => {
    try {
        const response = await fetch('http://10.0.2.2:5000/api/get_watchlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Unable to fetch watchlist');
        }

        const data = await response.json();
        const watchlist = data.watchlist;

        console.log('Watchlist:', watchlist);

        // Fetch details for each movie in the watchlist
        const promises = watchlist.map(async (movieId) => {
            const details = await fetchMovieDetails(movieId, language);
            return details;
        });

        const movieDetails = await Promise.all(promises);
        setWatchLaterList(movieDetails);
    } catch (error) {
        console.error('Error fetching watchlist:', error.message);
        throw error;
    }
  };

  const getHistory = async (username) => {
    try {
        const response = await fetch('http://10.0.2.2:5000/api/get_history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Unable to fetch watch history');
        }

        const data = await response.json();
        const watchHistory = data.watch_history;

        console.log('Watch history:', watchHistory);

        // Fetch details for each movie in the watchlist
        const promises = watchHistory.map(async (movieId) => {
            const details = await fetchMovieDetails(movieId, language);
            return details;
        });

        const movieDetails = await Promise.all(promises);
        setHistoryFilms(movieDetails);
    } catch (error) {
        console.error('Error fetching watch history:', error.message);
        throw error;
    }
  };

  const getCast = async (username) => {
    try {
        const response = await fetch('http://10.0.2.2:5000/api/get_castlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Unable to fetch cast list');
        }

        const data = await response.json();
        const favoriteCast = data.castlist;

        console.log('Cast list:', favoriteCast);

        const promises = favoriteCast.map(async (castId) => {
            const details = await fetchPersonDetails(castId, language);
            // console.log(details)
            return details;
        });

        const castDetails = await Promise.all(promises);
        // console.log(castDetails)
        setFavoriteCast(castDetails);
    } catch (error) {
        console.error('Error fetching cast list:', error.message);
        throw error;
    }
  };

  const getMovieDetials = async (id, language) => {
    const data = await fetchMovieDetails(id, language);
    console.log('got movie details');
    
    // console.log(data);
    // setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  };

  const getMovieCredits = async (id, language) => {
    const data = await fetchMovieCredits(id, language);
    console.log('got movie credits');
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async (id, language) => {
    const data = await fetchSimilarMovies(id, language);
    console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  const getVideoMovies = async (id, language) => {
    const data = await fetchVideoMovies(id, language);
    console.log('got video trailer movies');
    if (data && data.results) {
      setVideoMovies(data.results);
    }
  };

  const addTowatchlater = async (id) => {
    try {
        if (!username) {
            console.error('Error: Username is not defined.');
            return;
        }

        const response = await fetch('http://10.0.2.2:5000/api/add_remove_watchlater', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                movie_id: id,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);

            if (data.result) {
                console.log(`Removed movie ${id} from watchlist`);
                // Handle removal from watchlist
                console.log(data);
            } else {
                console.log(`Added movie ${id} to watchlist`);
                // console.log(data);
                // Handle addition to watchlist
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };
  

  const addtoWatchHistory = async (id) => {
    try {
      if (!username) {
        console.error('Error: Username is not defined.');
        return;
      }
  
      const response = await fetch('http://10.0.2.2:5000/api/add_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          movie_id: id,
        }),
      });
  
      const data = await response.json();
      // const responseBody = await response.text();
      // console.log('Response Body:', responseBody);
      if (response.ok) {
        console.log(data.message);
  
        if (data.result) {
          console.log(`Added movie ${id} to watch history`);
          // navigation.navigate("Player", { id: movie.id });
        }
      } else {
        const errorMessage = await response.text();
        console.error('Lỗi:', errorMessage);
        // console.log('Response Body:', responseBody);
      }
    } catch (error) {
      // console.log('Response Body:', responseBody);
      console.error('Error:', error);
    }
  };
  
  // const getWatchLater = async (username) => {
  //   try {
  //     const response = await fetch('http://10.0.2.2:5000/api/get_watchlist', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username }),
  //       credentials: 'include',
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Unable to fetch watchlist');
  //     }
  
  //     const data = await response.json();
  //     const watchlist = data.watchlist;
  
  //     console.log('Watchlist:', watchlist);
  
  //     setWatchLater(watchlist);
  //   } catch (error) {
  //     console.error('Error fetching watchlist:', error.message);
  //     throw error;
  //   }
  // };
  
  
  const checkMovieInWatchlist = async (username, id) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/check_movie_in_watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          movie_id: id,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (String(data.result) == 'true') {
          toggleWatchLater(true)
        }
        // console.log('Result:', data.result);  // true or false
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>
      {/* back button and movie poster */}
      <View style={{ width: '100%' }}>
        <SafeAreaView style={styles.buttonContainer}>
          <TouchableOpacity style={[Buttonstyles.background, styles.buttonContainerItem]} onPress={() => {
            getWatchLater(username)
            getHistory(username)
            getCast(username)
            navigation.goBack()
            }}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <View style={[styles.buttonContainerItem, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
            {/* <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
              <HeartIcon size={35} color={isFavourite ? theme.mainColor : 'white'} />
            </TouchableOpacity> */}
          </View>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }} style={{ width: width, height: height * 0.55 }} />
            <LinearGradient
              colors={['transparent', 'rgba(12, 12, 12, 0.8)', 'rgba(12, 12, 12, 1)']}
              style={{ width: width, height: height * 0.40, position: 'absolute', bottom: 0 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* movie details */}

      <View style={{ marginTop: -(height * 0.09), marginVertical: 12, marginHorizontal: 20 }}>
        {/* title */}
        <Text style={styles.movieTitle}>{movie?.title}</Text>

        {/* status, release year, runtime */}
        {movie?.id ? (
          <View style={styles.subHeading}>
              {(movie.vote_average || 0) > 7 ? (
                  <Text style={[styles.voteText, { color: 'green', borderColor: 'green' }]}>
                      {(movie.vote_average || 0).toFixed(1)}
                  </Text>
              ) : (movie.vote_average || 0) > 5.5 ? (
                  <Text style={[styles.voteText, { color: 'orange', borderColor: 'orange' }]}>
                      {(movie.vote_average || 0).toFixed(1)}
                  </Text>
              ) : (
                  <Text style={[styles.voteText, { color: 'red', borderColor: 'red' }]}>
                      {(movie.vote_average || 0).toFixed(1)}
                  </Text>
              )}
            <Text style={styles.movieDetails}>
              {movie?.status} | {movie?.release_date?.split('-')[0] || 'N/A'} | {movie?.runtime} {isVietnamese ? "phút" : "min"}
            </Text>
          </View>
        ) : null}

        {/* genres  */}
        <View style={{ flexDirection: 'row', marginVertical: 8, flexWrap: 'wrap', }}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} style={styles.genreText}>
                {genre?.name} {showDot ? '| ' : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <TouchableOpacity 
          style={styles.movieDescriptions}
          onPress={() => toggleDescriptions(!isDescriptions)}
        >
          <Text style={styles.subTitle}>{isVietnamese ? "Mô tả" : "Descriptions"}</Text>
          <IonIcon name={isDescriptions ? 'caret-down' : 'caret-forward'} size={20} color={'white'} />
        </TouchableOpacity>
        {isDescriptions && (
          <>
            <Text style={[styles.movieDescription, {marginBottom: 10,}]}>{movie?.overview}</Text>

            {/* cast */}
            {movie?.id && cast.length > 0 && <Cast cast={cast} />}
            {/* crew */}
            {/* {movie?.id && crew.length > 0 && <Cast cast={crew} />} */}
          </>
        )}


        <View style={styles.buttonsVideo}>

          {/* Button "Watch Movie" */}
          <TouchableOpacity
            style={[styles.movieButton, Buttonstyles.background]}
            onPress={() => {
              addtoWatchHistory(movie.id)
              navigation.navigate("Player", { id: movie.id })
            }}
          >
            <IonIcon name="play" size={25} color="white" />
            <Text style={styles.movieButtonText}>{isVietnamese ? "Xem" : "Movie"}</Text>
          </TouchableOpacity>

          {/* Button "Watch Trailer" */}
          {videoMovies.length > 0 && (
            <TouchableOpacity
              style={styles.movieButton}
              // onPress={() => checkMovieInWatchlist(username, movie.id)}
              onPress={() => navigation.navigate("Trailer", { id: movie.id })}
            >
              <IonIcon name="film-outline" size={25} color="white" />
              <Text style={styles.movieButtonText}>Trailer</Text>
            </TouchableOpacity>
          )}

          {/* watch later */}
          <View style={styles.buttonWatchLater}>
            <TouchableOpacity onPress={() => {
              addTowatchlater(movie.id);
              toggleWatchLater(!isWatchLater);
              // getWatchLater(username);
              // getWatchLater(username);
            }} >
              <IonIcon name={isWatchLater ? 'checkmark' : 'add'} size={35} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.movieDescription}>{isVietnamese ? "Sau" : "Later"}</Text>
          </View>

        </View>

      </View>

      {/* similar movies section */}
      {movie?.id && similarMovies.length > 0 && <MovieList title={isVietnamese ? "Tương tự" : "Similar"} hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: topMargin,
  },
  buttonContainerItem: {
    borderRadius: 10,
    padding: 1,
  },
  buttonWatchLater: {
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 1,
    // marginBottom: 10,
  },
  movieTitle: {
    color: 'white',
    // textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  subHeading: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  voteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    borderWidth: 2,
    borderRadius: 5,
    padding: 3,
  },
  movieDetails: {
    color: '#8a8a8a',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  movieDescriptions: {
    flexDirection: 'row',
    // gap: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  genreText: {
    color: theme.grayColor,
    fontWeight: '600',
    fontSize: 20,
    fontStyle: 'italic',
    // textAlign: 'center',
  },
  subTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
    // textAlign: 'center',
  },
  movieDescription: {
    color: '#8a8a8a',
    textAlign: 'justify',
    // marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  buttonsVideo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  movieButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.mainColor,
    paddingHorizontal: 30,
    // marginTop: 20,
    // marginHorizontal: 100,
  },
  movieButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});