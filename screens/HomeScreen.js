import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { HeaderMovit } from '../components/header';
import { StatusBar } from 'expo-status-bar';
import { fetchTrendingMovies, fetchNowPlayingMovies, fetchUpcomingMovies, fetchTopRatedMovies, fetchPopularMovies, fetchCountryMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [vietNam, setVietNam] = useState([]);
  const [japan, setJapan] = useState([]);
  const [korea, setKorea] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, username,
          realName, setRealname,
          email, setEmail,
          address, setAddress,
          age, setAge,      
  } = useContext(AuthContext);
  const navigation = useNavigation();

  const isVietnamese = language === 'vi';

  // const {
  //   loading, language,
  //   page, setPage, totalPage,
  //   trending, upcoming, topRated,
  //   fetchTrending, fetchUpcoming, fetchTopRated,
  // } = useContext(AuthContext);

  // useEffect(() => {
  //   setPage(1)
  // }, []);

  // useEffect(() => {
  //   if (page > 0) {
  //     fetchTrending();
  //     fetchUpcoming();
  //     fetchTopRated();
  //   }
  // }, [page, language])

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getInfo(),
        getTrendingMovies(),
        getNowPlayingMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
        getPopularMovies(),
        getVietNamMovies(),
        getJapanMovies(),
        getKoreaMovies(),
      ]);
      setLoading(false);
    };
  
    fetchData();
  }, [language]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies(language);
    console.log('got trending', data.results.length)
    if(data && data.results) setTrending(data.results);
  }
  const getNowPlayingMovies = async ()=>{
    const data = await fetchNowPlayingMovies(language);
    console.log('got now playing', data.results.length)
    if(data && data.results) setNowPlaying(data.results);
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies(language);
    console.log('got upcoming', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies(language);
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }
  const getPopularMovies = async ()=>{
    const data = await fetchPopularMovies(language);
    console.log('got popular', data.results.length)
    if(data && data.results) setPopular(data.results);
  }
  const getVietNamMovies = async ()=>{
    const data = await fetchCountryMovies(language, 'VN');
    console.log('got Viet Nam', data.results.length)
    if(data && data.results) setVietNam(data.results);
  }
  const getJapanMovies = async ()=>{
    const data = await fetchCountryMovies(language, 'JP');
    console.log('got Japan', data.results.length)
    if(data && data.results) setJapan(data.results);
  }
  const getKoreaMovies = async ()=>{
    const data = await fetchCountryMovies(language, 'KP');
    console.log('got Korea', data.results.length)
    if(data && data.results) setKorea(data.results);
  }
  const getInfo = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/get_user_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      const data = await response.json();
      
      setEmail(data.email)
      setAge(data.age)
      setAddress(data.address)
      setRealname(data.realname)

      console.log('User Info:', data);
  
    } catch (error) {
      console.error('Error:', error);
    }
    // console.log('ok')
    // navigation.navigate('Profile')
  };

  return (
    <View style={styles.container}>
      <HeaderMovit />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {trending.length > 0 && <TrendingMovies title={isVietnamese ? "thịnh hành" : "Trending"} data={trending} />}
          {nowPlaying.length > 0 && <MovieList title={isVietnamese ? "Đang chiếu" : "Now Playing"} data={nowPlaying} />}
          {upcoming.length > 0 && <MovieList title={isVietnamese ? "sắp chiếu" : "Upcoming"} data={upcoming} />}
          {topRated.length > 0 && <MovieList title={isVietnamese ? "xếp hạng cao" : "Top Rated"} data={topRated} />}
          {popular.length > 0 && <MovieList title={isVietnamese ? "phổ biến" : "Popular"} data={popular} />}
          {vietNam.length > 0 && <MovieList title={isVietnamese ? "Việt Nam" : "Vietnamese"} data={vietNam} />}
          {japan.length > 0 && <MovieList title={isVietnamese ? "Nhật" : "Japanese"} data={japan} />}
          {korea.length > 0 && <MovieList title={isVietnamese ? "Hàn" : "Korean"} data={korea} />}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  safeArea: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    ...StyleSheet,
  },
  scrollContainer: {
    paddingBottom: 10,
  },
});