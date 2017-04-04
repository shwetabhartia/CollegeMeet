from models import *

clean_database(db)
initialize_database(db)

db.connect()

'''
INSERTING DATA
'''
# Test User
test_user_1 = User.create(email='scomathe@gmail.com', password='password', fname='Scott', lname='Mathews', description='A cool dude.')
test_user_2 = User.create(email='janesmith@gmail.com', password='password', fname='Scott', lname='Mathews', description='A cool gal.')

test_user_1.save()
test_user_2.save()

# Test Match
test_match_1 = Matches.create(user1=test_user_1, user2=test_user_2)
test_match_1.save()

# Test Topic
test_topic_1 = Topic.create(admin=test_user_1, name='Programming', description='A community for discussing programming')
test_topic_1.save()

# Test Subscription
test_subscription_1 = Subscribes.create(user=test_user_1, topic=test_topic_1)
test_subscription_2 = Subscribes.create(user=test_user_2, topic=test_topic_1)

# Test Post
test_post_1 = Post.create(topic=test_topic_1, user=test_user_1, title='How do you like a peewee, flask, react, redux stack?', content='I personally like it.')

# Test Comment
test_comment_1 = Comment.create(post=test_post_1, user=test_user_2, content='It is fun, that is for sure.')

'''
TESTING UTILS
'''
from utils import *

# TEST LOGGING INSERTING
print('Expecting True: ' + str(check_valid_login('scomathe@gmail.com', 'password')))
print('Expecting False: ' + str(check_valid_login('john@indiana.edu', 'notmypassword')))

# TESTING INSERTIONS
insert_user('john@indiana.edu', 'password', 'John', 'Smith', 'Generic person.')
insert_topic(get_user_by_email('john@indiana.edu').id, 'Swimming', 'A community for dedicated and casual swimmers.')
insert_subscription(get_user_by_email('john@indiana.edu').id, get_topic_by_name('Swimming').id)
insert_post(get_user_by_email('john@indiana.edu'), get_topic_by_name('Swimming'), 'Anybody here?', 'I think I am the only swimmer.')
insert_comment(get_user_by_email('scomathe@gmail.com'), test_post_1.id, 'Glad to hear it!')

# TESTING QUERIES

# Test getting subscriptions
insert_subscription(get_user_by_email('scomathe@gmail.com').id, get_topic_by_name('Swimming').id)
print('Get subscriptions by user')
print(str(get_subscriptions_by_uid(1)))
print()

# Test getting posts by topic
print('Get posts by topic id')
print(str(get_posts_by_tid(1)))
print()

# Test getting posts by user
print('Get posts by user id')
print(str(get_posts_by_uid(1)))
print()

# Test getting comments by user
print('Get comments by user id')
print(str(get_comments_by_uid(1)))
print()

# Test getting comments by post
print('Get topics by post id')
print(str(get_comments_by_pid(1)))
print()

# how does it look when you find 1 object?
print('One object')
for user in User.select().where(User.id == 1):
    print(str(user.__dict__))

# how  does it look when you find multiple objects?
print('Multiple objects')
for user in User.select().where(User.id > 1):
    print(str(user.__dict__))

print()

# Testing to_dict function
print('Dictionary of post')
print(str(get_posts_by_uid(1)[0].to_dict()))
