import * from settings

REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')

STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]

CORS_ORIGIN_WHITELIST = [
    'https://localhost:8000',
    'https://localhost:3000',
]