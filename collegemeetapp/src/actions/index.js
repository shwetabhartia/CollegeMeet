import * as types from '../constants/ActionTypes';
import * as async from '../async/index';
import { navigateUserPage, navigateTopicPage } from '../navigation';


/*
Login Actions
*/
export const startSession = (email, uid) => {return {type: types.START_SESSION,
                                                    email,
                                                    uid};};

export function sendLoginRequest(email, password) {
  return function (dispatch) {
    return async.requestLogin(email, password).end((err, res) => {
      if(err) {
        console.log(err)
      } else if (res.text !== 'Invalid Email or Password.'){
        let uid = parseInt(res.text, 10)
        dispatch(startSession(email, uid))
        navigateUserPage(uid)
      } else {
        console.log(res.text)
      }
    })
  };
}

/*
User Creation Actions
*/
export function sendCreateUserRequest(email, password, fname, lname, description) {
  return function (dispatch) {
    return async.createUser(email, password, fname, lname, description).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        return res.text
      }
    })
  }
}


/*
User Page Actions
*/
export const fillUserPage = (name, description, likes, posts, comments) => ({type: types.FILL_USER_PAGE,
                                                                            name,
                                                                            description,
                                                                            likes,
                                                                            posts,
                                                                            comments});

export function sendUserPageRequest(uid) {
  return function(dispatch) {
    dispatch(fillUserPage('', '', [], [], []))
    async.getUserPage(uid).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        let values = JSON.parse(res.text)
        let name = values.fname + ' ' + values.lname
        if (values.likes === undefined) {
          values.likes = []
        }
        return dispatch(fillUserPage(name, values.description, values.likes, values.posts, values.comments, values.posts, values.comments))
      }
    })
  }
}

/*
Topic Page Actions
*/
export const selectPost = (pid) => ({type: types.SELECT_POST,
                                     pid})

export const fillTopicPage = (name, posts) => ({type: types.FILL_TOPIC_PAGE,
                                                name,
                                                posts});

export const fillComments = (pid, comments) => ({type: types.FILL_COMMENTS,
                                                          pid,
                                                          comments});

export function sendTopicPageRequest(topicName) {
  return function (dispatch) {
    async.getPosts(topicName).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        let posts = JSON.parse(res.text)
        if(posts !== []) {
          dispatch(fillTopicPage(topicName, posts))
        }
      }
    })
  }
}

export function createPost(topicName, uid, title, content) {
  return function(dispatch) {
    async.createPost(topicName, uid, title, content).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        navigateTopicPage(topicName)
      }
    })
  }
}

export function createComment(pid, uid, content, topicName) {
  return function(dispatch) {
    async.createComment(pid, uid, content).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        dispatch(sendCommentRequest(pid))
      }
    })
  }
}

export function updateUserLike() {
  return function(dispatch, getState) {
    async.addLike(getState().session.uid, getState().topicPage.name).end((err, res) => {
      if(err) {
        console.log(err)
      }
    })
  }
}

export function sendCommentRequest(pid) {
  return function(dispatch) {
    async.getComments(pid).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        let data = JSON.parse(res.text)
        let comments = data.comments

        dispatch(fillComments(pid, comments))
      }
    })
  }
}

/*
Dashboard Actions
*/
export const fillDashboardPage = (topics, posts) => ({type: types.FILL_DASHBOARD_PAGE,
                                                      topics,
                                                      posts})

export function sendDashboardPageRequest(uid) {
  return function(dispatch) {
    async.getFeed(uid).end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        let data = JSON.parse(res.text)
        let likes = data.likes
        let posts = data.posts
        return dispatch(fillDashboardPage(likes, posts))
      }
    })
  }
}