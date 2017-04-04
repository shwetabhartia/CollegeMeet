from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from objects import Database
# from flask_jwt import JWT, jwt_required, current_identity

# login functionality
# validUser
# returns true if username and password match a username and password
def validUser(email, password):
    users = db.users
    for user in users:
        if user.email == email:
            if user.password == password:
                return True
    return False

# initialize app
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'super-secret'

'''
ROUTES
'''
@app.route('/login', methods=['POST'])
def login():
    # get email and password
    state = request.get_json()

    email = state['email']
    password = state['password']

    uid = db.getUid(email)

    if validUser(email, password):
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

    db.addUser(email, password, fname, lname, description, [])
    uid = db.getUid(email)
    db.updateLikes(uid, 'Programming')
    return 'Success!'

@app.route('/createTopic', methods=['POST'])
def createTopic():
    # get topicname
    data = request.get_json()

    name = data['topic']

    db.addTopic(name)
    return 'Success!'

@app.route('/createPost', methods=['POST'])
def createPost():
    # get topicName, uid, title, content
    data = request.get_json()

    topicName = data['topicName']
    uid = data['uid']
    title = data['title']
    content = data['content']

    db.addPost(topicName, uid, title, content)
    return 'Success!'

@app.route('/createComment', methods=['POST'])
def createComment():
    data = request.get_json()

    pid = int(data['pid'])
    uid = int(data['uid'])
    content = data['content']

    db.addComment(pid, uid, content)
    return 'Success!'

@app.route('/user', methods=['POST'])
def getUserInfo():
    data = request.get_json()

    try:
        email = data['email']
        uid = db.getUid(email)
    except:
        uid = int(data['uid'])

    user = db.getUser(uid)

    posts = db.getUserPosts(uid)

    comments = db.getUserComments(uid)

    response = {
        'email': user.email,
        'uid': user.uid,
        'fname': user.fname,
        'lname': user.lname,
        'description': user.description,
        'likes': user.likes,
        'posts': posts,
        'comments': comments,
    }

    return jsonify(response)

@app.route('/comments', methods=['POST'])
def getUserComments():
    data = request.get_json()

    uid = int(data['uid'])

    comments = db.getUserComments(uid)

    return jsonify(comments)

@app.route('/posts', methods=['POST'])
def getUserPosts():
    data = request.get_json()

    uid = int(data['uid'])

    posts = db.getUserPosts(uid)

    return jsonify(posts)

@app.route('/posts/<topicName>', methods=['GET'])
def getPosts(topicName):
    posts = db.getPosts(topicName)
    for post in posts:
        post['comments'] = db.getComments(post['pid'])

    return jsonify(posts)

@app.route('/comments/<pid>', methods=['GET'])
def getComments(pid):
    comments = db.getComments(int(pid))

    return jsonify(comments)

@app.route('/user/feed/<uid>', methods=['GET'])
def getFeed(uid):
    uid = int(uid)
    # get user's topics
    user = db.getUser(uid)

    print(str(user))
    topics = user.likes

    # get posts for each topic
    posts = []
    for topic in topics:
        posts.extend(db.getPosts(topic))

    payload = {
        'likes': topics,
        'posts': posts
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
    app.run(host='localhost', port=29564)
    # app.run()
