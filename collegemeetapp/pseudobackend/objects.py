"""
Objects For Database
"""

class User():
    def __init__(self, uid, email, password, fname, lname, description, likes):
        self.uid = uid
        self.email = email
        self.password = password
        self.fname = fname
        self.lname = lname
        self.description = description
        self.likes = likes

class Topic():
    def __init__(self, name):
        self.name = name

class Post():
    def __init__(self, pid, topicName, uid, title, content):
        self.pid = pid
        self.topicName = topicName
        self.uid = uid
        self.title = title
        self.content = content

class Comment():
    def __init__(self, cid, pid, uid, content):
        self.cid = cid
        self.pid = pid
        self.uid = uid
        self.content = content

class Database():
    def __init__(self, users=[], topics=[], posts=[], comments=[]):
        self.users = users
        self.topics = topics
        self.posts = posts
        self.comments = comments

        self.pidGen = 0
        self.cidGen = 0
        self.uidGen = 0

    """
    ADD ITEMS
    """
    def addUser(self, email, password, fname, lname, description, likes):
        self.users.append(User(self.nextUid(), email, password, fname, lname, description, likes))

    def addTopic(self, name):
        self.topics.append(Topic(name))

    def addPost(self, topicName, uid, title, content):
        self.posts.append(Post(self.nextPid(), topicName, uid, title, content))

    def addComment(self, pid, uid, content):
        self.comments.append(Comment(self.nextCid(), pid, uid, content))


    """
    UPDATE ITEMS
    """
    def updateLikes(self, uid, topicName):
        try:
            for user in self.users:
                if user.uid == uid:
                    if topicName not in user.likes:
                        user.likes.append(topicName)
        except:
            return 'Error updating likes'

    """
    GET ITEMS
    """
    def getUid(self, email):
        try:
            users = [user for user in self.users if user.email == email]
            return users[0].uid
        except:
            return 'Error getting user id'

    def getUser(self, uid):
        try:
            users = [user for user in self.users if user.uid == uid]
            return users[0]
        except:
            return 'Error getting user'

    def getPosts(self, topicName):
        try:
            posts = [post.__dict__ for post in self.posts if post.topicName == topicName]
            return posts
        except:
            return 'Error getting posts'

    def getComments(self, pid):
        try:
            comments = [comment.__dict__ for comment in self.comments if comment.pid == pid]
            return comments
        except:
            return 'Error finding comments.'

    def getUserComments(self, uid):
        try:
            comments = [comment.__dict__ for comment in self.comments if comment.uid == uid]
            return comments
        except:
            return 'Error finding User comments'

    def getUserPosts(self, uid):
        try:
            posts = [post.__dict__ for post in self.posts if post.uid == uid]
            return posts
        except:
            return 'Error finding User posts'


    """
    HELPERS
    """
    def nextPid(self):
        self.pidGen += 1
        return self.pidGen

    def nextCid(self):
        self.cidGen += 1
        return self.cidGen
    
    def nextUid(self):
        self.uidGen += 1
        return self.uidGen
