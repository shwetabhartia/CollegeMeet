# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    description = models.CharField(max_length=100)
    connections = models.ManyToManyField("self", related_name="connections")

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})


class ConnectionRequest(models.Model):
	sender = models.ForeignKey(User, related_name = "sender", on_delete=models.CASCADE)
	receiver = models.ForeignKey(User, related_name = "receiver", on_delete=models.CASCADE)

	created_at = models.DateTimeField(auto_now_add=True)
