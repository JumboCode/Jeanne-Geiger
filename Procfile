release: python src/manage.py migrate
web: cd src && gunicorn dvhrt.wsgi --log-file - 