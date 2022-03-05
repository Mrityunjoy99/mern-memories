import * as api from '../api/index'
import { CREATE, FETCH_ALL,DELETE, LIKE, UPDATE } from '../constrants/actionTypes';
export const getPosts = () => async (dispatch) => {
    try {
        const  {data}  = await api.fetchPosts();
        console.log(data);
        dispatch({type:FETCH_ALL,payload:data})
    } catch (error) {
        console.log(error);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id,updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        // console.log(id);
        dispatch({ type: DELETE, payload: id });
        console.log('deleted successfully');
    } catch (error) {
        console.log(error);
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}