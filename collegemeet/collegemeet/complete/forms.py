from django import forms
from .models import Topic, Post, PostComments

class TopicForm(forms.ModelForm):
	class Meta:
		model = Topic
		fields = ['name', 'description']

class PostForm(forms.ModelForm):
	class Meta:
		model = Post
		fields = ['description']

class PostCommentsForm(forms.ModelForm):
	class Meta:
		model = PostComments
		fields = ['comment']