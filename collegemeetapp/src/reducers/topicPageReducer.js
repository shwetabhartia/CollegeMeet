import { FILL_TOPIC_PAGE, FILL_COMMENTS, SELECT_POST } from '../constants/ActionTypes';

const initialState = {
  name: '',
  posts: []
};

export default function topicPage(state = initialState, action) {
  switch(action.type) {
  case FILL_TOPIC_PAGE:
    return {
			...state,
      name: action.name,
      posts: action.posts
    };
  case FILL_COMMENTS:
    // Replace comments field on a post
    return {
      ...state,
      posts: state.posts.map(
        post => post.pid === action.pid ? { ...post, comments: action.comments }
                                        : post
      )
    }
  case SELECT_POST:
    return {
      ...state,
      selectedPost: action.pid
    }
  default:
    return state;
  }
};
