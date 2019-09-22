## Setting up the Backend

0. For Linux users:
	- If you get an error that says "port 5432 is not accepting connections", try this:
		`sudo nano /etc/postgresql/9.3/main/postgresql.conf`
		Enable or add:
		     `listen_addresses = *`
		Restart the database engine:
		      `sudo service postgresql restart`

1. Follow main setup in README.md for backend

2. Download/Install postgresql:
	- For Mac users: `brew install postgres`
	- Linux: `sudo apt-get install postgresql`

3. Get your Local Database Setup:
	- Start Up postgresql:
		- Mac: `brew services start postgresql`
		- Linux: `sudo -u postgres psql postgres`
	- Init your Database and User:
		- Both: `psql postgres`
		- (If you are having trouble, try `psql -U postgres`)
		 `CREATE DATABASE djangotutorial;`
		 `CREATE USER djangotutorial WITH PASSWORD 'supersecret';`
		 `GRANT ALL PRIVILEGES ON DATABASE "djangotutorial" to djangotutorial;`
	- Exit postgres with `\q`

4. Virtual environment setup:
	- To create the virtual environment:
		`python3 -m venv <name of virtual environment>`
	- To enter virtual environment:
		`. <name of venv>/bin/activate`

5. Running server:
	- To install requirements from the server while in the virtual environment. If you ever 
	update the requirements, make sure to run this command again, too:
		`pip install -r requirements.txt`
	- To make the migrations that will be applied to the server after making changes
		`python manage.py makemigrations`
	- If that doesn't work, try:
		`python manage.py makemigrations api`
	- To apply the migrations that were made using the makemigrations commands
		`python manage.py migrate`
	- To run the server
		`python manage.py runserver`
	- To load dummy data into the database,
		`python manage.py loaddata data.json`
		 - data.json is the file whose data will be loaded into the database
	- To dump data from the database and put it into a file called "datadump.json"
		`python manage.py dumpdata --indent 2 > datadump.json`
	- To flush all migrations
		`python manage.py flush`

# High Level Ideas and Tips That May Clear Things Up
1. Use Django Rest Framework Python Package For Our project
	- We may be already doing this, but we were not sure

2. *Don't commit files that are used for the build*, such as files located in venv, env, 
or __pycache__
	- They're likely to create conflicts, and it's bad practice to include build or 
	binary files

3. Going along with the "don't commit build files" idea, each person should make their 
own virtual env for the project
	- Don't commit your virtual environment!
	- Each machine may install their requirements differently, and we don't want 
	conflicts

4. The src/urls.py file is the high level root location for the project, but it's NOT 
neccessarily where the urls for the client facing application should go
	- This is a convention we should follow for Django to work correctly

5. The api/urls.py file in the api folder is where client-facing url paths will go
	- This is where we map certain urls to different views, and call .as_view() for 
	different classes defined in views.py

6. Views.py is where much of the logic goes for serializing data from the models
	- We define different classes with names like ListExchangesRaw, which serialize
	data and make queryset
	- Each class defined in views.py generally has a subclass, which determines
	what methods and functions it inherits
	- Pay attention to which subclasses we use, as this will give us different 
	functionality for different views (ex: get and post)
	- Then in urls.py, use <TBD>.as_view() to use that class for a given 
	url

# Postgresql Commands
- To open up postgres with a specific database
	`psql <name of database>`
- To list all the tables in a given database (after accessing it through psql)
	`\dt`
- To open up general postgres database
	`psql postgres`
- To list all the databases in postgres
	`\l` (use a lower case L)
- To select all columns in a table named <TBD>
	`select * from <TBD>;`
- To delete a column named "dated_added" in a table named "<TBD>"
	`ALTER TABLE <TBD> DROP COLUMN date_added;`
- To quit postgres
	`\q`

# Database Commands (These require that local postgres database is on)
- To delete a database like djangotutorial
	`dropdb <name of database>`
- To create a database like djangotutorial
	`createdb <name of database>`

# Useful Django Code
- To loop through post parameters
	`for key in request.POST:`
		`print(key)`
		`print(request.POST[key])`
		`print("")`
- To serialize all the textbooks in the database (and thus strip books of unnecessary 
fields)
- Ask for all textbook objects from database, without filtering
	`textbooks = Textbook.objects.all()`
- Ask for all textbook objects from database, with filtering by post_id
	`textbooks = Textbook.objects.filter(post_id=2)`
- Serialize the books
	`serializedTextbooks = TestSerializer(textbooks, many=True)`
- Return the serialized data in a response
	`return Response(serializedTextbooks.data)`

# How to Use Admin Interface to Edit Database
- This interface will allow you to edit any information already in the database, add to it, or delete from it - *super useful!*	
- If you haven't made a [superuser](https://docs.djangoproject.com/en/1.8/intro/tutorial02/) yet:
	- Activate virtual environment: `. <name of virtual environment>/bin/activate`
	- Create a superuser: `python manage.py createsuperuser`
	- Enter your desired username and password
	- Run the server: `python manage.py runserver`
	- Navigate to https://localhost:8000/admin and it will ask for login credentials

=

# Info on how to use each POST and GET route
- path("Cases/", <TBD>.as_view(), name="exchange-list")
	- GET: 
	- POST:



# Helpful Links
- Spencer Postgres Tutorial: https://github.com/JumboCode/django-postgres-tutorial?fbclid=IwAR2OYUCsvZQdscLrme6B8yCTYir_iiNHp4SA0UKhdaNvlTQyU15SWnZcu2Q
- Spencer Django Tutorial: https://github.com/JumboCode/django-tutorial
- How to Enable and Connect the Django Admin Interface: https://www.digitalocean.com/community/tutorials/how-to-enable-and-connect-the-django-admin-interface
- Django Authentication: https://www.django-rest-framework.org/api-guide/authentication/#setting-the-authentication-scheme
