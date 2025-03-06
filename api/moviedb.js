import axios from "axios";
// import { apiKey } from "../constants";

export const apiKey = '4e80299570f883238b5b376377d6ea42';

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = language => `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}&language=${language}`;
const nowplayingMoviesEndpoint = language => `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&language=${language}`;
const upcomingMoviesEndpoint = language => `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}&language=${language}`;
const topRatedMoviesEndpoint = language => `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&language=${language}`;
const popularMoviesEndpoint = language => `${apiBaseUrl}/movie/popular?api_key=${apiKey}&language=${language}`;
const countryMoviesEndpoint = (language, country) => `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=${language}&with_origin_country=${country}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
const searchPeopleEndpoint = `${apiBaseUrl}/search/person?api_key=${apiKey}`;

// endpoints with dynamic params

// movie
const movieDetailsEndpoint = (id, language) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}&language=${language}`;
const movieCreditsEndpoint = (id, language) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}&language=${language}`;
const similarMoviesEndpoint = (id, language) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}&language=${language}`;
const videoMoviesEndpoint = (id, language) => `${apiBaseUrl}/movie/${id}/videos?api_key=${apiKey}&language=${language}`;
const reviewsMoviesEndpoint = (id, language, page) => `${apiBaseUrl}/movie/${id}/reviews?api_key=${apiKey}&language=${language}&page=${page}`;

// person
const personDetailsEndpoint = (id, language) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}&language=${language}`;
const personMoviesEndpoint = (id, language) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}&language=${language}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;


// fallback images 
export const fallbackMoviePoster = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTMDRdk9cg-m9XBnrj5LWEC_1nNA_Mqwe6jqtB2_9shoCyxq9MG';
export const fallbackPersonImage = 'https://i.pinimg.com/736x/c9/bc/a5/c9bca57cf02ef46be89630414a89b5f5.jpg';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}


// home screen apis
export const fetchTrendingMovies = (language) => {
    return apiCall(trendingMoviesEndpoint(language));
}
export const fetchNowPlayingMovies = async (language, page = 1) => {
    const params = {
        page,
        api_key: apiKey,
    };
    try {
        let response = await apiCall(nowplayingMoviesEndpoint(language), params)
        
        while (response && response.total_pages > page && response.results) {
            const nextPage = await apiCall(nowplayingMoviesEndpoint(language), {
                ...params,
                page: page + 1,
            });
            response.results = response.results.concat(nextPage.results);
            page++;
            
            if (page >= 5) { // Giới hạn số page fetch
                break;
            }
        }
        return response;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};
export const fetchUpcomingMovies = async (language, page = 1) => {
    const params = {
        page,
        api_key: apiKey,
    };
    try {
        let response = await apiCall(upcomingMoviesEndpoint(language), params)
        
        while (response && response.total_pages > page && response.results) {
            const nextPage = await apiCall(upcomingMoviesEndpoint(language), {
                ...params,
                page: page + 1,
            });
            response.results = response.results.concat(nextPage.results);
            page++;
            
            if (page >= 5) { // Giới hạn số page fetch
                break;
            }
        }
        return response;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};
export const fetchTopRatedMovies = async (language, page = 1) => {
    const params = {
        page,
        api_key: apiKey,
    };
    try {
        let response = await apiCall(topRatedMoviesEndpoint(language), params)
        
        while (response && response.total_pages > page && response.results) {
            const nextPage = await apiCall(topRatedMoviesEndpoint(language), {
                ...params,
                page: page + 1,
            });
            response.results = response.results.concat(nextPage.results);
            page++;
            
            if (page >= 5) { // Giới hạn số page fetch
                break;
            }
        }
        return response;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};
export const fetchPopularMovies = async (language, page = 1) => {
    const params = {
        page,
        api_key: apiKey,
    };
    try {
        let response = await apiCall(popularMoviesEndpoint(language), params)
        
        while (response && response.total_pages > page && response.results) {
            const nextPage = await apiCall(popularMoviesEndpoint(language), {
                ...params,
                page: page + 1,
            });
            response.results = response.results.concat(nextPage.results);
            page++;
            
            if (page >= 5) { // Giới hạn số page fetch
                break;
            }
        }
        return response;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};
export const fetchCountryMovies = async (language, country, page = 1) => {
    const params = {
        page,
        api_key: apiKey,
    };
    try {
        let response = await apiCall(countryMoviesEndpoint(language, country), params)
        
        while (response && response.total_pages > page && response.results) {
            const nextPage = await apiCall(countryMoviesEndpoint(language, country), {
                ...params,
                page: page + 1,
            });
            response.results = response.results.concat(nextPage.results);
            page++;
            
            if (page >= 5) { // Giới hạn số page fetch
                break;
            }
        }
        return response;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};


// movie screen apis
export const fetchMovieDetails = (id, language) => {
    return apiCall(movieDetailsEndpoint(id, language));
}
export const fetchMovieCredits = (movieId, language) => {
    return apiCall(movieCreditsEndpoint(movieId, language));
}
export const fetchSimilarMovies = (movieId, language) => {
    return apiCall(similarMoviesEndpoint(movieId, language));
}
export const fetchVideoMovies = (movieId, language) => {
    return apiCall(videoMoviesEndpoint(movieId, language));
}
export const fetchReviewsMovies = (movieId, language, page) => {
    return apiCall(reviewsMoviesEndpoint(movieId, language, page));
}

// person screen apis
export const fetchPersonDetails = (personId, language) => {
    return apiCall(personDetailsEndpoint(personId, language));
}
export const fetchPersonMovies = (personId, language) => {
    return apiCall(personMoviesEndpoint(personId, language));
}

// search screen apis
export const searchMovies = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}
export const searchPeople = (params) => {
    return apiCall(searchPeopleEndpoint, params);
}


// Genres api
export function configureAxios() {
    axios.defaults.baseURL = apiBaseUrl
}

// export function fetchGenres() {
//     const url = `/genre/movie/list?api_key=${apiKey}`
//     return axios.get(url)
// }

export function fetchGenres() {
    const url = `/genre/movie/list?api_key=${apiKey}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching genres:', error);
            throw error;
        });
}

export function fetchMoviesForGenreId(genreId, language, page) {
    const url = `/discover/movie?with_genres=${genreId}&language=${language}&page=${page}&api_key=${apiKey}`;
    return apiCall(url);
}

export function postMovie(data) {
    const url = `/genre/movie/list?api_key=${apiKey}`
    return axios.get(url)
}

export function navigateToListScreen(genreId, genreName, language, navigation) {
    fetchMoviesForGenreId(genreId, language, 1)
        .then((response) => {
            const results = response.results || [];
            navigation.navigate('List', { title: genreName, data: results });
        })
        .catch((error) => {
            console.error('Error fetching movies for genre:', error);
        });
}

// Stream Video
export const getSmashystreamUrl = (tmdbID) => {
    return `https://embed.smashystream.com/playere.php?tmdb=${tmdbID}`
}
export const getSuperembedUrl = (tmdbID) => {
    return `https://multiembed.mov/directstream.php?video_id=${tmdbID}&tmdb=1`
}
export const get2embedUrl = (tmdbID) => {
    return `https://www.2embed.cc/embed/${tmdbID}`
}
export const getYoutubeUrl = (tmdbID) => {
    return `https://www.youtube.com/embed/${tmdbID}`
}