from models import *
'''
TODO:

Write tests for each function

Ensure SQL queries return proper order

Enable pagination ?
'''

'''
OTHER
'''
# Check if a email and password match.
def check_valid_login(email, password):
    try:
        user = get_user_by_email(email)

        return user.password == password

    except:
        return False
    

'''
INSERT ITEMS
'''
def insert_subscription(uid, tid):
    user = User.get(User.id == uid)
    topic = Topic.get(Topic.id == tid)

    subscription = Subscribes.create(user=user, topic=topic)
    subscription.save()

def insert_user(email, password, fname, lname, description):
    user = User.create(email=email, password=password, fname=fname, lname=lname, description=description)

    user.save()

def insert_topic(admin_uid, name, description):
    admin = User.get(User.id == admin_uid)

    topic = Topic.create(admin=admin, name=name, description=description)
    topic.save()

def insert_post(uid, tid, title, content):
    user = User.get(User.id == uid)
    topic = Topic.get(Topic.id == tid)

    post = Post.create(user=user, topic=topic, title=title, content=content)
    post.save()

def insert_comment(uid, pid, content):
    user = User.get(User.id == uid)
    post = Post.get(Post.id == pid)

    comment = Comment.create(user=user, post=post, content=content)
    comment.save()


'''
GET ITEMS
'''

# Get single user by their email
def get_user_by_email(email):
    user = User.get(User.email == email)

    return user

# Get single user by their id
def get_user_by_uid(uid):
    user = User.get(User.id == uid)

    return user

# Get single topic by name
def get_topic_by_name(name):
    topic = Topic.get(Topic.name == name)

    return topic

# Get multiple topics by user id
def get_subscriptions_by_uid(uid):
    user = get_user_by_uid(uid)

    subscriptions = []
    for subscription in user.subscriptions:
        subscriptions.append(subscription.topic)
    
    return subscriptions

# Get multiple posts by topic id
def get_posts_by_tid(tid):
    posts = []

    for post in Post.select().where(Post.topic == Topic.get(Topic.id == tid)):
        posts.append(post)

    return posts

# Get multiple posts by user id
def get_posts_by_uid(uid):
    posts = []

    for post in Post.select().where(Post.user == get_user_by_uid(1)):
        posts.append(post)

    return posts

# Get multiple comments by post id
def get_comments_by_pid(pid):
    comments = []
    for comment in Comment.select().where(Comment.post == Post.get(Post.id == pid)):
        comments.append(comment)

    return comments

# Get multiple comments by user id
def get_comments_by_uid(uid):
    comments = []
    for comment in Comment.select().where(Comment.user == get_user_by_uid(uid)):
        comments.append(comment)

    return comments