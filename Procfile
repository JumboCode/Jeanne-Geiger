release: cd src && python3 manage.py makemigrations && python3 manage.py migrate && cd frontend && npm install --only=dev 
web: cd src && gunicorn dvhrt.wsgi --log-file - 