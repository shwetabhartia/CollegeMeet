from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from .forms import TopicForm, PostForm
from .models import Topic, Post, User
from collegemeet.users.models import User
from django.core.serializers.json import DjangoJSONEncoder

try:
	from django.utils import simplejson as json
except ImportError:
	import json

def home(request):
	return render(request, 'complete/home.html')

## Topic Endpoints Begin ##

def create_topic(request):
    if request.method == "POST":
        # calling the postform class and it is giving a dictionary and it validates
        form = TopicForm(request.POST)
        if form.is_valid():
            topic = Topic(admin=request.user, name=form.cleaned_data['name'], description=form.cleaned_data['description'])
            topic.save()
            return redirect("complete:view_topic", topic_id=topic.id)
        else:
            return HttpResponse("There is an error")
    else:
        form = TopicForm()
        context = {
            "form": form,
        }
        return render(request, "complete/createTopic.html", context)

def view_topic(request, topic_id):
	return render(request, "complete/viewTopic.html")

def get_all_topics(request):
	admin = request.user
	context = {}
	topics = Topic.objects.all()
	context['topics'] = topics
	return render(request, "complete/showAllTopics.html", context)

def search_topic(request):
	query_string = ''
	found_entries = None
	if ('q' in request.GET) and request.GET['q'].strip(): #textboxname = q
		query_string = request.GET['q']
		entry_query = get_query(query_string, ['name', 'description', ])
		found_entries = Job.objects.filter(entry_query)
		context = {}
		context['query_string'] = query_string
		context['found_entries'] = found_entries
	return render(request, template_name = 'complete/searchResults.html', context = context)

def subscribe_topic(request):
	if request.method == "POST":
		topic_id = request.POST.get("topic_id") #need topic id

		user = request.user
		topic = Topic.objects.get(pk=topic_id)
		if is_user_subscribed_to_topic(user, topic):
			topic.subscribers.remove(user)
			subscribe_button_text = "unsubscribed"
		else:
			topic.subscribers.add(user)
			subscribe_button_text = "subscribed"

		topic.save()
		response = JsonResponse({'subscribe_button_text' : subscribe_button_text})
		return response

def is_user_subscribed_to_topic(user, topic):
	if topic.subscribers.filter(username=user.username).exists():
		return True
	else:
		return False

def view_members(request):
	return None

## Topic Endpoints Ends ##


## Post Endpoints Begin ##

'''
def create_post(request):
	if request.method == "POST":
		post_form = PostForm(request.POST)
		if post_form.is_valid():
			topic_id = request.POST.get("topic_id") #should get topic id from request object post data
			topic = Topic.objects.get(pk=topic_id)
			post = topic.post_set.create(description=form.cleaned_data['description'])
			topic.save()
			return redirect("complete:get_all_posts")
		else:
			return HttpResponse("Error Encountered!")
	else:
		form = PostForm()
		topics = Topic.objects.all()
		context = {
		"form": form,
		"topics": topics
		}
	return render(request, "complete/createPost.html", context)
'''
def create_post(request):
	if request.method == "POST":
		print(request.POST.get('postbox'))


def get_all_posts(request):
	user = request.user
	context = {}
	topic_id = request.POST.get("topic_id") #should get topic id from request object post data
	topic = Topic.objects.get(pk=topic_id)
	posts = topic.post_set.all()
	context['posts'] = posts
	return render(request, "complete/showAllPosts.html", context)

def is_user_post_liked(user, post):
	if post.likes.all().exists():
		if post.likes.filter(username=user.username).exists():
			return True
		else:
			return False
	else:
		return False

def like_post(request):
	if request.method == "POST":
		post_id = request.POST.get("post_id")

		user = request.user
		post = Post.objects.get(pk=post_id)

		if is_user_post_liked(user, post):
			post.likes.remove(user)
			like_button_text = "Like"
		else:
			post.likes.add(user)
			like_button_text = "UnLike"

		post.save()
		response = JsonResponse({'like_button_text': like_button_text})
		return response

def is_user_post_shared(user, post):
	if post.shares.filter(username=user.username).exists():
		return True
	else:
		return False

def share_post(request):
	if request.method == "POST":
		post_id = request.POST.get("post_id")

		user = request.user
		post = Post.objects.get(pk=post_id)

		if is_user_post_shared(user, post) == False:
			post.shares.add(user)
			post.save()
		
		share_button_text = "Shared"
		response = JsonResponse({'share_button_text' : share_button_text})
		return response

## Post Endpoints Ends ##

## User Endpoints Begins ##

'''
Input Required:
	{
	  'username': "sbhartia",
	  'name': "Shweta Bhartia",
	  'description': "Hi I am Shweta Bhartia"
	}

Output:

'''

def update_profile(request):
	username = request.POST.get("username")
	name = request.POST.get("name")
	description = request.get("description")

	user = User.objects.all().filter(username=username).update(name=name,description=description)
	try:
		user.save()
		JsonResponse({"status":"true","message":"updated succesfully"})
	except:
		JsonResponse({"status":"false","message":"Error!"}, status=500)

def get_user_profile(request):
    user = request.user
    response = JsonResponse({'username': user.username, 'name': user.name, 'description': user.description, 'connections': user.connections})
    return response

def send_friend_request(request):
	return None

## User Endpoints Ends ##