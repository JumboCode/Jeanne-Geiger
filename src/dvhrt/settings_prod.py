"""
Django settings for Jeanne Geiger project.

Generated by 'django-admin startproject' using Django 2.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import django_heroku
import dotenv
import dj_database_url
from rest_framework.settings import api_settings
from corsheaders.defaults import default_headers



# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# IMPORTANT for postgres Heroku
dotenv_file = os.path.join(BASE_DIR, ".env")
ENV = os.path.isfile(dotenv_file)
if ENV:
    dotenv.load_dotenv(dotenv_file)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '%37to9jwjy*x4ai*+zt@lz$rm+8hko!7l*6=o4(y-f^6#@!h1)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [''] # for localhost running of the server


# Application definition

INSTALLED_APPS = [
    'api',
    'dvhrt',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',  # < As per whitenoise documentation
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True


CORS_ALLOW_HEADERS = list(default_headers) + [
    'communityid',
    'caseid',
    'startdate',
    'enddate',
]

CORS_ORIGIN_WHITELIST = [
    'https://localhost:8000',
    'https://localhost:3000',
]

ROOT_URLCONF = 'dvhrt.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dvhrt.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases


DATABASES = {}
DATABASES['default'] = dj_database_url.config(conn_max_age=600)


FIXTURE_DIRS = (
    'api/fixtures/',
)


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication'
    ]
}


STATIC_URL = '/static/'

# Place static in the same location as webpack build files
if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'build', 'static')
REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')
STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build/static')
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# If you want to serve user uploaded files add these settings
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'build', 'media')


django_heroku.settings(locals())
# This is new
del DATABASES['default']['OPTIONS']['sslmode']

