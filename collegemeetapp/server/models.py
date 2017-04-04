from peewee import *

import datetime

db = PostgresqlDatabase('collegemeet', user='postgres', password='admin')

class BaseModel(Model):
    class Meta:
        database = db

class User(BaseModel):
    # id = IntegerField (auto generating)
    email = CharField(unique=True)
    password = CharField(max_length=16)
    fname = CharField(max_length=100)
    lname = CharField(max_length=100)
    description = TextField()
    date_joined = DateTimeField(default=datetime.datetime.now)

    def to_dict(self):
        return { 'email': self.email, 'uid': self.id, 'fname': self.fname, 'lname': self.lname, 'name': self.fname + self.lname, 'description': self.description, }

class Matches(BaseModel):
    user1 = ForeignKeyField(User, related_name='from_user')
    user2 = ForeignKeyField(User, related_name='to_user')

    class Meta:
        indexes = (
            (('user1', 'user2'), True),
        )

class Topic(BaseModel):
    admin = ForeignKeyField(User, related_name='managed_topics')
    name = CharField(unique=True)
    description = TextField()

    def to_dict(self):
        return { 'tid': self.id, 'admin': self.admin.id, 'name': self.name, 'description': self.description, }

class Subscribes(BaseModel):
    user = ForeignKeyField(User, related_name='subscriptions')
    topic = ForeignKeyField(Topic, related_name='subscribers')

    class Meta: 
        indexes = (
            (('user', 'topic'), True),
        )

class Post(BaseModel):
    topic = ForeignKeyField(Topic, related_name='topic_posts')
    user = ForeignKeyField(User, related_name='user_posts')
    title = CharField(max_length=100)
    content = TextField()
    created_on = DateTimeField(default=datetime.datetime.now)

    def to_dict(self):
        return { 'pid': self.id, 'tid': self.topic.id, 'uid': self.user.id, 'title': self.title, 'content': self.content, 'created_on': self.created_on, }

class Comment(BaseModel):
    post = ForeignKeyField(Post, related_name='post_comments')
    user = ForeignKeyField(User, related_name='user_comments')
    content = TextField()
    created_on = DateTimeField(default=datetime.datetime.now)

    def to_dict(self):
        return { 'cid': self.id, 'pid': self.post.id, 'uid': self.user.id, 'content': self.content, 'created_on': self.created_on, }


def clean_database(db):
    db.connect()

    db.drop_table(User, fail_silently=True, cascade=True)
    db.drop_table(Topic, fail_silently=True, cascade=True)
    db.drop_table(Subscribes, fail_silently=True, cascade=True)
    db.drop_table(Post, fail_silently=True, cascade=True)
    db.drop_table(Comment, fail_silently=True, cascade=True)
    db.drop_table(Matches, fail_silently=True, cascade=True)

    db.close()

def initialize_database(db):
    db.connect()

    db.create_tables([User, Topic, Subscribes, Post, Comment, Matches])

    db.close()

#  clean_database(db)
#  initialize_database(db)
