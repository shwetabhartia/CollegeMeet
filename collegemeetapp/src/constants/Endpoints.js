// const ROOT = 'http://silo.cs.indiana.edu:29564';
const ROOT = 'http://localhost:29564';

// Login
export const loginEndpoint = ROOT + '/login';

// Object Creation
export const createUserEndpoint = ROOT + '/createUser';
export const createTopicEndpoint = ROOT + '/createTopic';
export const createPostEndpoint = ROOT + '/createPost';
export const createCommentEndpoint = ROOT + '/createComment';

// Object Getters
export const getUserEndpoint = ROOT + '/user';
export const getUserCommentsEndpoint = ROOT + '/comments';
export const getUserPostsEndpoint = ROOT + '/posts';
export function getPostsEndpoint(topicName) { return ROOT + '/posts/' + topicName }; // + topicName
export function getCommentsEndpoint(pid) {return ROOT + '/comments/' + pid}; // + pid
export function getFeedEndpoint(uid) {return ROOT + '/user/feed/' + uid}; // + uid

// Object Updates
export const updateLikesEndpoint = ROOT + '/likeTopic';
