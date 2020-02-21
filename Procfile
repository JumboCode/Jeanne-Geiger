release: cd src && python3 manage.py makemigrations.py && python3 manage.py migrate && python3 manage.py runserver
web: gunicorn backend.wsgi --log-file -