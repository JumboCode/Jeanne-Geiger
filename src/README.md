# Backend 


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

## Running the Local vs Production Backend
- Running local backend 
    - src/frontend/src/utils/index.js
        - Set value of DOMAIN: `export const DOMAIN = 'http://localhost:8000/'`
    - src/dvhrt/settings.py
        - Change all occurrences of `os.environ['key']` to actual value (some occur in utils.py too)
            - *Don't commit the actual values, in production use environment variables*
        - Set DATABASES variable
            ```
            DATABASES = {
                'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': 'dvhrtdb',
                'USER': 'dvhrtdbadmin',
                'PASSWORD': 'I_want_to_buy_a_onesie_8',
                'HOST': 'localhost',
                'PORT': '',
            }
            ```
        - Comment out the line `del DATABASES['default']['OPTIONS']['sslmode']`
- Run production backend 
    - src/frontend/src/utils/index.js
        - Set value of DOMAIN: `export const DOMAIN = 'https://dvhrt.herokuapp.com/'`
    - src/dvhrt/settings.py
        - Set DATABASES variable
            ```
            DATABASES = {}
            DATABASES['default'] = dj_database_url.config(conn_max_age=600)
            ```
        - Uncomment the line `del DATABASES['default']['OPTIONS']['sslmode']`
- Note that these lists of changes may not be complete 


## Overview of Important Files
- models.py
    - A model is the single, definitive source of information about your data
        - The model contains the fields and behaviors of the stored data 
        - Each model maps to a single database table 
        - Each attribute of the model represents a database field
    - There are 5 models: Cases, Outcomes, Communities, Persons, RiskFactors
        - Cases: the main database that represents one domestic violence case and contains references (through foreign keys) to the Outcomes, Communities, RiskFactors, and Persons table (twice, once for victim and abuser)
        - Outcomes: the results of a case surrounding criminal justice 
        - Communities: a location that tracks its own case files (ex. a town)
        - Persons: the personal information of either a victim or abuser
        - RiskFactors: the individual factors used to assess the severity of a case
- serializers.py
    - Serializers converts data (ex. querysets or model instances) to native Python datatypes (or vice versa)
    - Each model in models.py has a corresponding serializer in serializers.py
    - A serializer must be called on data extracted from the database for it to be usable in views.py
- urls.py (in src/api/)
    - This file contains all of the urls for the client facing application
    - It maps certain urls to different views, and calls .as_view() for different classes defined in views.py
- utils.py
    - This file contains the utility functions that help with auth0 authentication and authorization
    - The token contains information that specifies what scope the user has, i.e. what they can access
    - The token also contains other customized information that is set in the token in the auth0 rules
        - ex. the functions get_site, get_roles, etc. access this information 
    - The management token is a different token that allows the application to manage the auth0 users 
- views.py
    - A view is a function that takes a web request and returns a web response 
        - Classes serialize data and make querysets from the models 
        - Each class has a subclass, which determines what methods and functions it inherits (ex. get, post)
    - The method decorators specify which users have access to which views
        - By default, users can only access views if they are logged in 
        - A view can require scope to be "admin" or "coord" (or none) to further specify who can access them
- settings.py
    - Settings contains the django and auth0 settings for the project 
    - These settings must be changed to run the application locally 
    - os.environ refers to the dictionary of heroku environment variables, set at Heroku.com 

## Info on how to use each POST and GET route
- path('cases/', views.CasesList.as_view(), name="cases")
    - POST: given a case id and all case data in the request body, either updates a case (based on the id) or creates a new one if it doesn't exist, in the community of the current coordinator user
        - Scope: coordinator 
- path('one-case/', views.OneCase.as_view(), name="one-case")
    - GET: given a caseid in the header, returns the data of that case
        - Scope: coordinator 
- path('CasesByCommunity/', views.CasesByCommunity.as_view(), name="CasesByCommunity")
    - GET: returns all of the cases associated with the community of the current coordinator 
        - Scope: coordinator 
- path('communities/', views.CommunitiesList.as_view(), name="communities")
    - GET: returns all of the communities 
        - Scope: admin 
    - POST: given all community data in the request body, creates a new community (including adding new coordinator users)
        - Scope: admin
- path('OneCommunity/', views.OneCommunity.as_view(), name="OneCommunity")
    - GET: given a community id in the request header, returns the data associated with that community
        - Scope: admin or coordinator 
    - POST: given a community id in the request header and all community data in the request body, edits the data of an existing community
- path('AddCoordinator/', views.AddCoordinator.as_view(), name="AddCoordinator")
    - POST: given a community id in the request header and emails in the request body, creates new auth0 coordinator accounts for those emails 
        - Scope: admin
- path('ActiveCaseCountView/', views.ActiveCaseCountView.as_view(), name="ActiveCaseCountView")
    - GET: given a community id in the request header, returns the number of active cases for that community
        - Scope: admin
- path('DVHRTReferalSourceView/', views.DVHRTReferalSourceView.as_view(), name="DVHRTReferalSourceView")
    - GET: given a community id in the request header, returns a count of the different referral sources used in that community
        - Scope: coordinator 
- path('DVHRTHighRiskVictimInfo/', views.DVHRTHighRiskVictimInfo.as_view(), name="DVHRTHighRiskVictimInfo")
    - GET: given a community id in the request header, returns summary of info for all victims in that community
        - Scope: admin or coordinator 
- path('DVHRTHighRiskAbuserInfo/', views.DVHRTHighRiskAbuserInfo.as_view(), name="DVHRTHighRiskAbuserInfo")
    - GET: given a community id in the request header, returns summary of info for all abusers in that community
        - Scope: admin or coordinator 
- path('DVHRTRiskFactorCounts/', views.DVHRTRiskFactorCounts.as_view(), name="DVHRTRiskFactorCounts")
    - GET: given a community id in the request header, returns summary of info for all risk factors in that community 
        - Scope: admin or coordinator 
- path('DVHRTCriminalJusticeOutcomes/', views.DVHRTCriminalJusticeOutcomes.as_view(), name="DVHRTCriminalJusticeOutcomes")
    - GET: given a community id in the request header, returns summary of info for all outcomes in that community 
        - Scope: admin or coordinator 


## Overview of Auth0
- There are two types of users, admin and coordinator
    - Admin
        - The admin is the manager for the entire organization. They can create and edit communities, where each community has its own list of cases. They can see stats for a community, but they cannot view individual case files. 
        - A user is set to be an admin by having the role "DVHRT_ADMIN" in auth0
    - Coordinator 
        - The coordinator is manager for one community. They can add and edit cases in their own community and view stats on their own community, but they cannot view data from any other community
        - A user is set to be a coordinator by having the role "Coordinator" in auth0 and by having a site id set in their metadata which refers to their specific community
- A user by default can't access any of the backend views without being logged in 
- Views can also have scopes which specify which users have access to which views based on their role 


## Database Commands 
- Postgresql commands
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
- Database commands (these require that local postgres database is on)
    - To delete a database
        `dropdb <name of database>`
    - To create a database
        `createdb <name of database>`
- How to Use Admin Interface to Edit Database
    - This interface will allow you to edit any information already in the database, add to it, or delete from it - *super useful!*	
    - If you haven't made a [superuser](https://docs.djangoproject.com/en/1.8/intro/tutorial02/) yet:
        - Activate virtual environment: `. <name of virtual environment>/bin/activate`
        - Create a superuser: `python manage.py createsuperuser`
        - Enter your desired username and password
        - Run the server: `python manage.py runserver`
        - Navigate to https://localhost:8000/admin and it will ask for login credentials


## Other Tips
1. Use Django Rest Framework Python Package For Our project
	- We may be already doing this, but we were not sure
2. *Don't commit files that are used for the build*, such as files located in venv, env, 
or __pycache__
	- They're likely to create conflicts, and it's bad practice to include build or 
	binary files
3. Each person should make their own virtual env for the project
	- Don't commit your virtual environment!
	- Each machine may install their requirements differently, and we don't want 
	conflicts


# Helpful Links
- Spencer Postgres Tutorial: https://github.com/JumboCode/django-postgres-tutorial?fbclid=IwAR2OYUCsvZQdscLrme6B8yCTYir_iiNHp4SA0UKhdaNvlTQyU15SWnZcu2Q
- Spencer Django Tutorial: https://github.com/JumboCode/django-tutorial
- How to Enable and Connect the Django Admin Interface: https://www.digitalocean.com/community/tutorials/how-to-enable-and-connect-the-django-admin-interface
- Django Authentication: https://www.django-rest-framework.org/api-guide/authentication/#setting-the-authentication-scheme
