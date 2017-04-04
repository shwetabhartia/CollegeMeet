from django.apps import AppConfig


class CompleteConfig(AppConfig):
    name = 'collegemeet.complete'
    verbose_name = "Complete"

    def ready(self):
        """Override this to put in:
            Users system checks
            Users signal registration
        """
        pass
