import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342 } from '../api/moviedb';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';


const verticalMargin = 20;
const { width, height } = Dimensions.get('window');

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isFav, toggleFavCast] = useState(false);

  const {
    language, username,
    favoriteCast, setFavoriteCast
    // person, fetchPersonDetails,
    // personMovies, fetchPersonMovies,
  } = useContext(AuthContext);

  useEffect(() => {
    // fetchPersonDetails(item.id);
    // fetchPersonMovies(item.id);
    checkCastInCastlist(username, item.id)
    getPersonDetails(item.id, language);
    getPersonMovies(item.id, language);
    setLoading(false);
  }, [item, language]);

  const isVietnamese = language === 'vi';

  const getPersonDetails = async (id, language) => {
    const data = await fetchPersonDetails(id, language);
    console.log('got person details');
    setLoading(false);
    if (data) {
      setPerson(data);
    }
  };

  const getPersonMovies = async (id, language) => {
    const data = await fetchPersonMovies(id, language);
    console.log('got person movies');
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  const addFavcast = async (id) => {
    try {
        if (!username) {
            console.error('Error: Username is not defined.');
            return;
        }

        const response = await fetch('http://10.0.2.2:5000/api/add_fav_cast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                cast_id: id,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);

            if (data.result) {
                console.log(`Removed Cast ${id} from cast list`);
                // Handle removal from watchlist
                console.log(data);
            } else {
                console.log(`Added cast ${id} to cast list`);
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

  const checkCastInCastlist = async (username, id) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/check_cast_in_castlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          cast_id: id,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (String(data.result) == 'true') {
          toggleFavourite(true)
        }
        // console.log('Result:', data.result);  // true or false
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* back button */}
      <SafeAreaView style={styles.backIconContainer}>
        <TouchableOpacity style={[Buttonstyles.background, { borderRadius: 10, padding: 1 }]} onPress={() => {
          getCast(username)
          navigation.goBack()
        }}>
          <ChevronLeftIcon width={28} height={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          addFavcast(item.id)
          toggleFavourite(!isFavourite)
          }}>
          <HeartIcon size={35} color={isFavourite ? theme.mainColor : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View style={{marginHorizontal: 20}}>
          <View style={styles.imageContainer}>
            <View style={styles.personImage}>
              <Image source={{ uri: image342(person?.profile_path) || fallbackPersonImage }} style={{ height: 150, width: 150 }} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.personName}>
                {person?.name}
              </Text>
              <Text style={styles.personDetails}>
                {person?.place_of_birth}
              </Text>
            </View>

          </View>


          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.subInfoText}>{isVietnamese ? "Giới tính" : "Gender"}</Text>
              <Text style={styles.infoText}> {person?.gender === 1 ? isVietnamese ? "Nữ" : "Female" : isVietnamese ? "Nam" : "Male"} </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subInfoText}>{isVietnamese ? "Ngày sinh" : "Birthday"}</Text>
              <Text style={styles.infoText}>{person?.birthday}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subInfoText}>{isVietnamese ? "Nghề nghiệp" : "Known for"}</Text>
              <Text style={styles.infoText}>{person?.known_for_department}</Text>
            </View>
            {/* <View style={styles.infoItem}>
              <Text style={styles.subInfoText}>Popularity</Text>
              <Text style={styles.infoText}>{person?.popularity?.toFixed(2)}%</Text>
            </View> */}
          </View>

          <View style={{ marginVertical: 24, }}>
            <Text style={styles.biographyText}>{isVietnamese ? "Tiểu sử" : "Biography"}</Text>
            <Text style={styles.biographyContent}>{person?.biography ? person.biography : 'N/A'}</Text>
          </View>

          {/* person movies */}
          {person?.id && personMovies.length > 0 && <MovieList title={isVietnamese ? "Đã tham gia" : "Participated in"} hideSeeAll data={personMovies} />}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  backIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    zIndex: 10,
    marginTop: verticalMargin,
  },
  imageContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    // shadowColor: 'gray',
    // shadowRadius: 40,
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 1,
  },
  personImage: {
    alignItems: 'center',
    overflow: 'hidden',
    // height: 150,
    // width: 150,
    borderColor: '#808080',
    borderWidth: 2,
    borderRadius: 100,
  },
  personName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
  },
  personDetails: {
    fontSize: 16,
    color: '#808080',
    // textAlign: 'center',
  },
  infoContainer: {
    marginVertical: 16,
    // margin: 16,
    // padding: 16,
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#2b2b2b',
    // borderRadius: 999,
  },
  infoItem: {
    // borderRightColor: '#808080',
    // borderRightWidth: 1,
    borderWidth: 2,
    borderColor: theme.mainColor,
    borderRadius: 13,
    padding: 13,
    alignItems: 'center',
    width: 110,
  },
  infoText: {
    fontWeight: '600',
    color: 'white',
  },
  subInfoText: {
    color: '#808080',
    fontSize: 12,
  },
  biographyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  biographyContent: {
    color: '#808080',
    textAlign: 'justify',
    marginTop: 8,
  },
});