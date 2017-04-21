import { push } from 'react-router-redux';
import fetchJSONP from 'fetch-jsonp';
import {
    FETCH_THEATERS_REQUEST,
    FETCH_THEATERS_FAILURE,
    FETCH_THEATERS_SUCCESS,
    FETCH_TOP250_REQUEST,
    FETCH_TOP250_FAILURE,
    FETCH_TOP250_SUCCESS,
    KEYWORD_CHANGE,
    FETCH_SEARCH_REQUEST,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE,
    TOGGLE_FAVORITE
} from '../constants/action-types';

// 存储状态到客户端本地
export const saveLocalState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));
    } catch (err) {
        // 忽略写入错误
    }
};

// 载入客户端本地状态
export const loadLocalState = () => {
    try {
        const state = localStorage.getItem('state');
        if (state === null) {
            return undefined;
        }
        return JSON.parse(state);
    } catch (err) {
        return undefined;
    }
};



/**
 * 操作创建器
 */

// 获取正在上映列表:
// 请求开始
const theatersRequest = (isLoadMore) => {
        return {
            type: FETCH_THEATERS_REQUEST,
            isLoadMore
        };
    };

// 请求成功
const theatersSuccess = (movies) => {
    return {
        type: FETCH_THEATERS_SUCCESS,
        movies
    };
};

// 请求失败
const theatersFailure = (error, isLoadMore) => {
    return {
        type: FETCH_THEATERS_FAILURE,
        isLoadMore,
        error
    };
};

// 异步获取数据
const apiTheaters = 'https://api.douban.com/v2/movie/in_theaters?start=';
export const fetchTheaters = (isLoadMore = false, start = 0) => {
    return (dispatch) => {
        dispatch(theatersRequest(isLoadMore));
        fetchJSONP(apiTheaters + start)
            .then(response => response.json())
            .then(json => dispatch(theatersSuccess(json)))
            .catch(error => dispatch(theatersFailure(error, isLoadMore)));
    };
};



// 获取高分榜单列表:
// 请求开始
const top250Request = (isLoadMore) => {
    return {
        type: FETCH_TOP250_REQUEST,
        isLoadMore
    };
};

// 请求成功
const top250Success = (movies) => {
    return {
        type: FETCH_TOP250_SUCCESS,
        movies
    };
};

// 请求失败
const top250Failure = (error, isLoadMore) => {
    return {
        type: FETCH_TOP250_FAILURE,
        isLoadMore,
        error
    };
};

// 异步获取数据
const apiTop250 = 'https://api.douban.com/v2/movie/top250?start=';
export const fetchTop250 = (isLoadMore = false, start = 0) => {
    return (dispatch) => {
        dispatch(top250Request(isLoadMore));
        fetchJSONP(apiTop250 + start)
            .then(response => response.json())
            .then(json => dispatch(top250Success(json)))
            .catch(error => dispatch(top250Failure(error, isLoadMore)));
    }
};



// 获取搜索列表:
// 请求开始
const searchRequest = (isLoadMore) => {
    return {
        type: FETCH_SEARCH_REQUEST,
        isLoadMore
    };
};

// 请求成功
const searchSuccess = (movies) => {
    return {
        type: FETCH_SEARCH_SUCCESS,
        movies
    };
};

// 请求失败
const searchFailure = (error, isLoadMore) => {
    return {
        type: FETCH_SEARCH_FAILURE,
        isLoadMore,
        error
    };
};

// 异步获取数据
const apiSearch = 'https://api.douban.com/v2/movie/search?q=';
export const fetchSearch = (keyword, isLoadMore = false, start = 0) => {
    return (dispatch) => {
        dispatch(searchRequest(isLoadMore));
        let apiUrl = apiSearch + keyword + '&start=' + start;
        fetchJSONP(apiUrl)
            .then(response => response.json())
            .then(json => dispatch(searchSuccess(json)))
            .catch(error => dispatch(searchFailure(error, isLoadMore)));
    }
};

// 切换关键字URL并发送KEYWORD_CHANGE操作
export const changeKeyword = (keyword) => {
    return (dispatch) => {
        dispatch({
            type: KEYWORD_CHANGE,
            keyword
        });

        // 设置URL
        dispatch(push(`/search/${keyword}`));
    }
};



// 切换电影的收藏状态
export const toggleFavorite = (movie) => {
    return {
        type: TOGGLE_FAVORITE,
        movie
    };
};