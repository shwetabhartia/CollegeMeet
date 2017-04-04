from django.db import models
from collegemeet.users.models import User

class Topic(models.Model):

    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=1000)
    subscribers = models.ManyToManyField(User, related_name='subscribers')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_post_count(self):
        return self.post_set.count()

    def total_subscribers(self):
        return self.subscribers.count()

class Post(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    description = models.CharField(max_length=5000)
    likes = models.ManyToManyField(User, related_name='likes')
    shares = models.ManyToManyField(User, related_name='shares')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def get_comment_count(self):
        return self.postcomments_set.count()

    def total_likes(self):
        return self.likes.count()

    def total_shares(self):
        return self.shares.count()

    def __str__(self):
        return self.description

    class Meta:
        ordering = ['-updated_at']


class PostComments(models.Model):

    commenting_user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.CharField(max_length=1000)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)