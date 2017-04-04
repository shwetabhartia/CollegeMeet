import { FILL_DASHBOARD_PAGE } from '../constants/ActionTypes';

const initialState = {
    topics: [],
    posts: []
};

export default function dashboardPage(state=initialState, action) {
    switch(action.type) {
    case FILL_DASHBOARD_PAGE:
        return {
            topics: action.topics,
            posts: action.posts
        };
    default:
        return state;
    }
};