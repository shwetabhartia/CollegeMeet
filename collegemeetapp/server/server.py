from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from models import *
from utils import *
# from flask_jwt import JWT, jwt_required, current_identity

# initialize app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret'

db.connect()

'''
ROUTES
'''
@app.route('/login', methods=['POST'])
def login():
    # get email and password
    state = request.get_json()

    email = state['email']
    password = state['password']
    uid = get_user_by_email(email).id

    if check_valid_login(email, password):

        return str(uid)
    else:

        return 'Invalid Email or Password.'

@app.route('/createUser', methods=['POST'])
def createUser():
    # get email and password

    state = request.get_json()

    email = state['email']
    password = state['password']
    fname = state['fname']
    lname = state['lname']
    description = state['description']

    insert_user(email, password, fname, lname, description)

    return 'Success!'

@app.route('/createTopic', methods=['POST'])
def createTopic():
    # get topicname

    data = request.get_json()

    uid = data['uid']
    name = data['name']
    description = data['description']

    insert_topic(uid, name, description)

    return 'Success!'

@app.route('/createPost', methods=['POST'])
def createPost():
    # get topicName, uid, title, content

    data = request.get_json()

    tid = data['tid']
    uid = data['uid']
    title = data['title']
    content = data['content']

    insert_post(uid, tid, title, content)

    return 'Success!'

@app.route('/createComment', methods=['POST'])
def createComment():

    data = request.get_json()

    uid = int(data['uid'])
    pid = int(data['pid'])
    content = data['content']

    insert_comment(uid, pid, content)

    return 'Success!'

@app.route('/user', methods=['POST'])
def getUserInfo():

    data = request.get_json()

    try:
        email = data['email']
        user = get_user_by_email(email)
    except:
        uid = int(data['uid'])
        user = get_user_by_uid(uid)

    try:
        posts = get_posts_by_uid(uid)
    except:
        posts = []

    try:
        comments = get_comments_by_uid(uid)
    except:
        comments = []
    
    try:
        topics = get_subscriptions_by_uid(uid)
    except:
        topics = []

    response = {
        'email': user.email,
        'uid': user.id,
        'fname': user.fname,
        'lname': user.lname,
        'description': user.description,
        'likes': [topic.name for topic in topics],
        'posts': [post.to_dict() for post in posts],
        'comments': [comment.to_dict() for comment in comments],
    }


    return jsonify(response)

@app.route('/comments', methods=['POST'])
def getUserComments():

    data = request.get_json()

    uid = int(data['uid'])

    comments = get_comments_by_uid(uid)

    db.close()
    return jsonify(comments)

@app.route('/posts', methods=['POST'])
def getUserPosts():

    data = request.get_json()

    uid = int(data['uid'])

    posts = get_posts_by_uid(uid)
    db.close()

    return jsonify(posts)

@app.route('/posts/<topicName>', methods=['GET'])
def getPosts(topicName):

    posts = db.getPosts(topicName)
    for post in posts:
        post['comments'] = get_comments_by_pid(post['pid'])

    return jsonify(posts)

@app.route('/comments/<pid>', methods=['GET'])
def getComments(pid):
    comments = get_comments_by_pid(int(pid))

    return jsonify(comments)

@app.route('/user/feed/<uid>', methods=['GET'])
def getFeed(uid):
    uid = int(uid)
    # get user's topics
    topics = get_subscriptions_by_uid(uid)

    # get posts for each topic
    posts = []
    for topic in topics:
        posts.extend(get_posts_by_tid(topic.id))

    payload = {
        'likes': [topic.name for topic in topics],
        'posts': [post.to_dict() for post in posts],
    }

    return jsonify(payload)

@app.route('/likeTopic', methods=['POST'])
def likeTopic():
    data = request.get_json()

    uid = int(data['uid'])
    topicName = data['topicName']

    db.updateLikes(uid, topicName)
    return 'Success!'

# JSON Web Tokens config
# jwt = JWT(app, authenticate, identity)


if __name__ == '__main__':
    CORS(app)
    app.run(host='localhost', port=29564, debug=True)
    # app.run()
