# Generated by Django 5.0.1 on 2024-01-05 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='answer',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
