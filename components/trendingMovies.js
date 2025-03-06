import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'; // Import StyleSheet
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { image500 } from '../api/moviedb';
import { Mainstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ title, data }) {
    const navigation = useNavigation();
    const { language } = useContext(AuthContext);
    const carouselRef = useRef(null);

    const handleClick = (item) => {
        navigation.navigate('Detail', item);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            carouselRef.current.snapToNext();
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            {language === 'vi' ? 
                <Text style={styles.titleText}>Phi<Text style={Mainstyles.mainText}>M</Text> {title}</Text>
            :
                <Text style={styles.titleText}>{title} <Text style={Mainstyles.mainText}>M</Text>ovies</Text>
            }
            <Carousel
                ref={carouselRef}
                data={data}
                renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
                firstItem={1}
                loop={true}
                loopClonesPerSide={data.length} // Set loopClonesPerSide to the length of your data array
                inactiveSlideScale={0.86}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
            {/* <ScrollView horizontal={true} style={styles.scrollViewContainer}>
                {data.map((item, index) => (
                    <MovieCard key={index} handleClick={handleClick} item={item} />
                ))}
            </ScrollView> */}
        </View>
    );
}

const MovieCard = ({ item, handleClick }) => {
    const [isWatchLater, toggleWatchLater] = useState(false);
    
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={styles.movieItemContainer}>
                <View>
                    <Image
                        source={{ uri: image500(item.poster_path) }}
                        style={styles.movieImage}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(12, 12, 12, 0.8)', 'rgba(12, 12, 12, 1)']}
                        style={{ width: width, height: height * 0.30, position: 'absolute', bottom: 0 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                </View>
                <View style={styles.voteContainer}>
                    {(item.vote_average || 0) > 7 ? (
                        <Text style={[styles.voteText, { color: 'green', borderColor: 'green' }]}>
                            {(item.vote_average || 0).toFixed(1)}
                        </Text>
                    ) : (item.vote_average || 0) > 5.5 ? (
                        <Text style={[styles.voteText, { color: 'orange', borderColor: 'orange' }]}>
                            {(item.vote_average || 0).toFixed(1)}
                        </Text>
                    ) : (
                        <Text style={[styles.voteText, { color: 'red', borderColor: 'red' }]}>
                            {(item.vote_average || 0).toFixed(1)}
                        </Text>
                    )}
                </View>
                <Text style={styles.movieTitle}>
                    {item.title.length > 20 ? item.title.slice(0, 14) + '...' : item.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        marginVertical: 4,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    titleText: {
        color: 'white', 
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    seeAllText: {
        // color: 'blue',
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
    },
    movieItemContainer: {
        marginRight: 10,
        marginVertical: 5,
        alignItems: 'center',
        position: 'relative',
    },
    movieImage: {
        width: width * 0.6,
        height: height * 0.4,
        borderRadius: 20,
        marginRight: 10,
    },
    movieTitle: {
        color: 'white',
        fontSize: 25,
        position: 'absolute',
        bottom: 0,
    },
    voteContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 3,
        borderRadius: 10,
        // borderWidth: 2,
    },
    voteText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 3,
        borderRadius: 8,
        borderWidth: 2,
    },
});
