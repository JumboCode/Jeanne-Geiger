release: cd src && python3 manage.py makemigrations && python3 manage.py migrate && cd frontend && npm install --only=dev && npm install && npm run build
web: cd src && python3 manage.py runserver 