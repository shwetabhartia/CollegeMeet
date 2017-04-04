import { browserHistory } from 'react-router';
import { store } from '../index';
import { sendTopicPageRequest } from '../actions';

export function navigateUserPage(uid) {
  browserHistory.push('/user/' + uid)
}

export function navigateTopicPage(topicName) {
  store.dispatch(sendTopicPageRequest(topicName))
  browserHistory.push('/topic/' + topicName)
}

export function navigateAboutPage() {
  browserHistory.push('/about')
}

export function navigateHomePage() {
  browserHistory.push('/')
}