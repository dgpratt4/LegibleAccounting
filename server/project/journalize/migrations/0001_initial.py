# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-05 01:58
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Journal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[('a', 'Approved'), ('d', 'Denied'), ('s', 'Submitted'), ('i', 'Initial')], default='i', max_length=1)),
                ('rejection_memo', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.CharField(blank=True, max_length=200, null=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Receipt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.FileField(upload_to=b'', verbose_name='Receipt Image')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=2, max_digits=20)),
                ('charge', models.CharField(choices=[('d', 'Debit'), ('c', 'Credit')], max_length=1)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('effected_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='accounts.Account')),
                ('from_journal', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='journalize.Journal')),
            ],
        ),
        migrations.AddField(
            model_name='receipt',
            name='of_transaction',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receipts', to='journalize.Transaction'),
        ),
    ]
