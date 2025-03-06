import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import { Mainstyles } from '../theme';
import { AuthContext } from '../AuthContext';

const { width, height } = Dimensions.get('window');

const MoviePreviewItem = ({ item, index }) => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Detail', item)}>
            <View style={styles.resultItem}>
                <View>
                    <Image
                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                        style={styles.image}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(12, 12, 12, 0.8)', 'rgba(12, 12, 12, 1)']}
                        style={{ width: width, height: height * 0.15, position: 'absolute', bottom: 0 }}
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
                <Text style={styles.title}>
                    {item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const MoviePreview = ({ results, hideResults }) => {
    const {
        loading, language,
        page, setPage, totalPage,
        upcoming, topRated,
        fetchUpcoming, fetchTopRated,
    } = useContext(AuthContext);

    useEffect(() => {
        setPage(1)
    }, []);

    const handleEndReached = () => {
        if (page < totalPage) {
            setPage(page + 1);
        }
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            // onEndReached={handleEndReached}
            // onEndReachedThreshold={0.1} // Đặt ngưỡng để xác định khi nào cuộc cuộc đến cuối trang
        >
            {hideResults && (
                <Text style={styles.resultText}>
                    {language === 'vi' ? 'Kết quả' : 'Results'} ({results.length})
                </Text>
            )}
            <View style={styles.resultsContainer}>
                {
                    results.map((item, index) => (
                        <MoviePreviewItem key={index} item={item} />
                    ))
                }
            </View>
        </ScrollView>
    );
};

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
        marginLeft: 16,
        marginBottom: 5,
    },
    resultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    resultItem: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: width * 0.44,
        height: height * 0.3,
        borderRadius: 12,
        position: 'relative',
    },
    title: {
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        // marginLeft: 16,
    },
    noResultsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    noResultsImage: {
        height: 250,
        width: 250,
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
    },
    voteText: {
        fontWeight: 'bold',
        color: 'white',
        padding: 3,
        borderRadius: 8,
        borderWidth: 2,
    },
});

export default MoviePreview;