import { 
  loginEndpoint, 
  createUserEndpoint,
  createPostEndpoint,
  createCommentEndpoint,
  getUserEndpoint, 
  getUserPostsEndpoint, 
  getUserCommentsEndpoint,
  getPostsEndpoint,
  getCommentsEndpoint,
  getFeedEndpoint,
  updateLikesEndpoint
 } from '../constants/Endpoints';
import request from 'superagent';

/* A file for our asynchronous functions */

export function requestLogin(email, password) {
  return request
  .post(loginEndpoint)
  .send({email, password})
}

export function createUser(email, password, fname, lname, description) {
  return request
  .post(createUserEndpoint)
  .send({email, password, fname, lname, description})
}

export function getUserPage(uid) {
  return request
  .post(getUserEndpoint)
  .send({uid})
}

export function getUserPosts(email) {
  return request
  .post(getUserPostsEndpoint)
  .send({email})
}

export function getUserComments(email) {
  return request
  .post(getUserCommentsEndpoint)
  .send({email})
}

export function getPosts(topicName) {
  return request
  .get(getPostsEndpoint(topicName))
}

export function getComments(pid) {
  return request
  .get(getCommentsEndpoint(pid))
}

export function getFeed(uid) {
  return request
  .get(getFeedEndpoint(uid))
}

export function createPost(topicName, uid, title, content) {
  return request
  .post(createPostEndpoint)
  .send({topicName, uid, title, content})
}

export function createComment(pid, uid, content) {
  return request
  .post(createCommentEndpoint)
  .send({pid, uid, content})
}

export function addLike(uid, topicName) {
  return request
  .post(updateLikesEndpoint)
  .send({uid, topicName})
}