import { FETCH_POSTS, } from './types';


export const fetchPosts = () => dispatch => {

  fetch('http://localhost:4000/top5')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

