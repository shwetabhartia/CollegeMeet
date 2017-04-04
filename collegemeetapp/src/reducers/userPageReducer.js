import { FILL_USER_PAGE } from '../constants/ActionTypes';

const initialState = {
  name: '',
  likes: [],
  posts: [],
  comments: [],
  description: ''
};

export default function userPage(state = initialState, action) {
  switch(action.type) {
  case FILL_USER_PAGE:
    return {
      name: action.name,
      description: action.description,
      likes: action.likes,
      posts: action.posts,
      comments: action.comments
    };
  default:
    return state;
  }
};
