# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.home,
        name='home'
    ),
    url(regex=r'^createTopic/$', view=views.create_topic, name="create_topic"),
    url(regex=r'^createPost/$', view=views.create_post, name="create_post"),
    url(regex=r'^profile/$', view=views.get_user_profile, name="get_user_profile"),
    url(regex=r'^likePost/$', view=views.like_post, name="like_post"),
    url(regex=r'^sharePost/$', view=views.share_post, name="share_post"),
    url(regex=r'^viewTopic/(?P<topic_id>[\d]+)/$', view=views.view_topic, name="view_topic")

]
