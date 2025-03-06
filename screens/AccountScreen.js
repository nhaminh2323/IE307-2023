import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { fetchPersonDetails } from '../api/moviedb';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { HeaderMovit } from '../components/header';
import { AuthContext } from '../AuthContext';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, fetchVideoMovies, image500 } from '../api/moviedb';
const AccordionHeader = ({ title, icon, onPress, isOpen }) => {
  return (
    <TouchableOpacity style={styles.userAccordionHeader} onPress={onPress} >
      <View style={styles.titleAccordion}>
        <Ionicons name={icon} size={30} color={'white'} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Ionicons name={isOpen ? 'caret-down' : 'caret-forward'} size={20} color={'white'} />
    </TouchableOpacity>
  );
};

const AccordionItem = ({ title, icon, onPress, hideIcon }) => {
  return (
    <View style={{ borderColor: theme.grayColor, borderTopWidth: 1 }}>
      <TouchableOpacity style={styles.userAccordionItem} onPress={onPress}>
        <View style={styles.titleAccordion}>
          <Ionicons name={icon} size={20} color={theme.grayColor} />
          <Text style={styles.textAccordion}>{title}</Text>
        </View>
        {!hideIcon && (
          <Ionicons name='chevron-forward' size={20} color={theme.grayColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const AccountScreen = () => {
  const navigation = useNavigation();
  // const [name, setName] = useState('Your Name');
  const [avatar, setAvatar] = useState('');
  // const [password, setPassword] = useState('Your Password');
  // const [email, setEmail] = useState('Your Email');
  const {
    username, setUsername,
    realName, setRealname,
    // watchLater, setWatchLater,
    email, setEmail,
    age, setAge,
    address, setAddress,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleLogout, 
    language,
    watchLater, setWatchLater,
    // fetchPersonDetails,


    watchLaterList, setWatchLaterList,
    historyFilms, setHistoryFilms,
    favoriteCast, setFavoriteCast
  } = useContext(AuthContext);

  const avatarSource = avatar ? { uri: avatar } : { uri: 'https://i.pinimg.com/736x/c9/bc/a5/c9bca57cf02ef46be89630414a89b5f5.jpg', };

  const [isPersonal, togglePersonal] = useState(false);
  const [isSettings, toggleSettings] = useState(false);
  const [isSupport, toggleSupport] = useState(false);  
  
  const isVietnamese = language === 'vi';
  

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

    navigation.navigate('Profile')
  };

  // useEffect(() => {
  //   getWatchLater(username);
  //   gethistoryFilms();
  // }, []);

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

  // getWatchLater(username)
  useEffect(() => {
    getWatchLater(username);
    // getWatchLater(username);
    getHistory(username);
    // getHistory(username);
  }, [username]);

  
  // const gethistoryFilms = async () => {
  //   const data = await fetchTopRatedMovies();
  //   console.log('got top rated', data.results.length);
  //   if (data && data.results) setHistoryFilms(data.results);
  // };

  // const gethistoryFilms = async (watchLater) => {
  //   try {
  //     const promises = watchLater.map(async (watchLater) => {
  //       const data = await fetchMovieDetails(watchLater);
  //       return data.results;
  //     });
  
  //     const results = await Promise.all(promises);
  //     const combinedResults = results.flat();
  
  //     setHistoryFilms(combinedResults);
  //     console.log(historyFilms);
  //   } catch (error) {
  //     console.error('Error fetching favorite films:', error.message);
  //   }
  // };
  
  // gethistoryFilms(watchLater)
  return (
    <View style={styles.container}>
      <HeaderMovit title="Account" hideSearch={'true'} />
      <ScrollView style={{ padding: 16 }}>

        <View style={styles.userAccordion}>
          <View style={styles.titleAccordion}>
            <Image source={avatarSource} style={styles.avatar} />
            <Text style={styles.titleText}>{realName}</Text>
          </View>
          <View style={{ borderRadius: 30, overflow: 'hidden' }}>
            <Button
              title={isVietnamese ? "Đăng xuất" : "Log out"}
              color={theme.mainColor}
              // onPress={() => Alert.alert('Simple Button pressed')}
              onPress={handleLogout}
            />
          </View>
          <AccordionItem title={isVietnamese ? "Chỉnh sửa hồ sơ" : "Edit Profile"} icon="person" onPress={getInfo} />
          <AccordionItem title={isVietnamese ? "Thay đổi mật khẩu" : "Change password"} icon="lock-closed" onPress={() => navigation.navigate('Password')} />
        </View>

        <View style={styles.userAccordion}>
          <AccordionHeader title={isVietnamese ? "Danh sách cá nhân" : "Personal list"} icon="heart-circle"
            onPress={() => togglePersonal(!isPersonal)} isOpen={isPersonal}
          />
          {isPersonal && (
            <>
              <AccordionItem title={isVietnamese ? "Lịch sử xem" : "View History"} icon="film"
                onPress={() => {
                  getHistory(username);
                  getHistory(username);
                  navigation.navigate("List", { title: isVietnamese ? "Lịch sử xem" : "View History", data: historyFilms, isClear: true, hideSearch: true })
              }}
              />
              <AccordionItem title={isVietnamese ? "Xem Sau" : "Watch Later"} icon="add"
                onPress={() => {
                  getWatchLater(username);
                  navigation.navigate("List", { title: isVietnamese ? "Xem Sau" : "Watch Later", data: watchLaterList, hideSearch: true });
                  // navigation.navigate("Bookmark", { title: "Watch Later", data: watchLater });
                }}
              />
              <AccordionItem title={isVietnamese ? "Diễn viên yêu thích" : "Favorite Casts"} icon="people"
                onPress={() => {
                  getCast(username)
                  navigation.navigate("List", { title: isVietnamese ? "Diễn viên Yêu thích" : "Favorite Casts", data: favoriteCast, isCast: true, hideSearch: true })
                }}
                // onPress={() => navigation.navigate("Cast", { title: "Favorite Casts", cast: cast })}
              />
            </>
          )}
        </View>

        <View style={styles.userAccordion}>
          <AccordionHeader title={isVietnamese ? "Cài đặt" : "Settings"} icon="settings"
            onPress={() => toggleSettings(!isSettings)} isOpen={isSettings}
          />
          {isSettings && (
            <>
              <AccordionItem title={isVietnamese ? "Phiên bản: 1.0.0" : "Version: 1.0.0"} icon="alert-circle" hideIcon={'false'} />
              <AccordionItem title={isVietnamese ? "ngôn ngữ" : "languages"} icon="globe" onPress={() => navigation.navigate('Languages')} />
              <AccordionItem title={isVietnamese ? "xem hình thu nhỏ" : "thumbnail view"} icon="images" hideIcon={'false'} />
              <AccordionItem title={isVietnamese ? "phát ở chế độ nền" : "plays in the background"} icon="volume-high" hideIcon={'false'} />
            </>
          )}
        </View>

        <View style={styles.userAccordion}>
          <AccordionHeader title={isVietnamese ? "Hỗ trợ" : "Support"} icon="information-circle"
            onPress={() => toggleSupport(!isSupport)} isOpen={isSupport}
          />
          {isSupport && (
            <>
              <AccordionItem title={isVietnamese ? 'Thông Tin' : 'Information'} icon="document-text" onPress={() => navigation.navigate('Information')} />
              <AccordionItem title={isVietnamese ? "Điều khoản sử dụng" : "Terms of Use"} icon="reader" onPress={() => navigation.navigate('Use')} />
              <AccordionItem title={isVietnamese ? "Chính sách quyền riêng tư" : "Privacy Policy"} icon="shield-checkmark" onPress={() => navigation.navigate('Privacy')} />
              <AccordionItem title={isVietnamese ? 'Liên hệ' : 'Contact'} icon="headset" onPress={() => navigation.navigate('Contact')} />
            </>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: theme.background,
  },
  userAccordion: {
    backgroundColor: theme.subBackground,
    padding: 13,
    borderRadius: 16,
    marginBottom: 16,
    gap: 13,
  },
  textAccordion: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  titleAccordion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAccordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userAccordionItem: {
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  titleText: {
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    width: 200,
    color: 'white',
  },
});

export const AccountScreenOptions = {
  tabBarLabel: 'Tài khoản',
  tabBarIcon: ({ color, size }) => (
    <Ionicons name="person" color={color} size={size} />
  ),
};

export default AccountScreen;