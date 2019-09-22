# TEN
JumboCode 2019-2020 Jeanne Geiger - Domestic Violence High Risk Team

Jeanne Geiger Crisis Center (JGCC) is a non-profit organization that works to empower domestic violence survivors and end domestic violence. The staff of JGCC provides advocacy, clinical, and legal services to survivors of domestic violence and their families. In 2005, after the homicide of one of JGCC’s client, Domestic Violence High Risk Team (DVHRT) was created to work with communities across the country to identify the most dangerous domestic violence cases. 

DVHRT Model consists of four strategies with the goal of creating mechanisms for the transfer and identify of critical information in high risk cases, closing systemic gaps where homicides can occur. DVHRT works with sites for nine to twelve months to implement the model, providing assessment of their current response system and training to advocates, law enforcement, and prosecutors. 

In the past, after communities working with DVHRT finish their training, they enter an evaluation phase, where JGCC collects data from sites to be able to assess how successful their homicide prevention efforts are. To do so, they have what they call data repositories, spreadsheets that allow them to collect more information on the cases they accept onto their high risk team. They also send JGCC their data each month of aggregate rundown.

DVHRT’s problem is they want to move from static, insecure spreadsheets to a more dynamic, collaborative, and secure database. Our goal is to empower DVHRT and the communities working with DVHRT to more effectively validate and successfully execute their homicide prevention efforts. 


## Team members
* Barry Eom (Project Lead)
* Julia Hedrick
* Khaliun Narangerel
* Erica DeBarge
* Andrew Gross
* Trevor Russo
* Nicole Kennedy
* Nate Hirsch
* Jake Owen
* Alessandra Jacimovic
* Panipuck Bhengsri
* Meha Elhence 
* Isabella Montoya

## Setting up Repository on Your Local Machine
1. `cd <PATH TO DIRECTORY YOU WANT YOUR CODE TO BE IN>`
2. `git clone https://github.com/JumboCode/TEN.git` This will create a directory called TEN
3. `cd TEN`

Next, install system dependencies:
1. If you don't have homebrew installed, run the following command
(if you're a MacOS user): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. `brew install python node yarn`
3. `sudo pip3 install --upgrade pip`
4. Check if you correctly installed Python: `python3 -V`
5. Check if you correctly installed pip: `pip3 list`

## How to Run Project on Local Machine
### Run frontend server (deploying React)
- Move into folder: `cd frontend`
- Build project: `npm run build`
- Start server: `npm start`
- If you run into any problems, run `npm install` and try these steps again
- Go to http://localhost:3000 (or whatever port is used) to see a local version of the website
- Quit with Control+C

### Run backend server (first see backend README for directions on how to setup environment)
- Move into folder: `cd backend`
- Activate environment: `. <name of environment>/bin/activate`
- Download any requirements: `pip install -r requirements.txt`
- If any models have changed: `python manage.py makemigrations` or `python manage.py makemigrations api`, then `python manage.py migrate`
- Run backend server: `python manage.py runserver`
- If you run into any problems, try: `pip install --upgrade pip setuptools`
- Go to http://localhost:8000 (or whatever port is used) to see a local version of the backend interface
It will prompt you to pick /admin or /api and a route

With both the frontend and backend server running simultaneously, the frontend will render and pull from 
your local database. Use console.log for any debugging.

## Architecture Overview
This project will be split up into three parts

### API: [Django](https://www.djangoproject.com/) REST API for all textbook CRUD (create, read, update, delete) operations. This will interact with the [PostgreSQL](https://www.postgresql.org/) database

### Database: [PostgreSQL](https://www.postgresql.org/) database. Stores all data.

### Frontend: [React](https://facebook.github.io/react/docs/hello-world.html) application

## Git Hacks
**Make sure to consistently `git pull` to make sure the repos you're working on are up-to-date**
1. To make sure your local repository is the most current version - on your local master branch: `git pull`
2. If any conflicts, fix those, `git add [files]` and `git commit`.
3. Now go to the current branch you're working on to add the most current code in the master branch: `git pull origin master`

### Making a New Branch
1. Checkout to the master branch: `git checkout master` and `git pull`
2. Create a new branch: `git checkout -b <branch name>`

### Navigating Branches
1. To change existing branches: `git checkout <branch name>`

### Making Changes to Branches
1. Add the changes you've made on your local branch: `git add .` This command will stash all the things you've edited/added/removed
2. As you work on sizable chunks of the code, commit your work with clear messages: `git commit -m "Some message"`. If you already have changes relevant to the most previous commit, you can type `git commit --amend` to group the changes together

### Current State of Branch
1. You can run `git status` to see what files have been added and whether you're up to date with the master branch
2. To see the difference between your branch and master, type: `git diff master`
3. To see a list of the current commits, both in your local branch and in the master branch: `git log`

### Making a Pull Request (PR)
1. Make sure you've added and committed all your changes
2. Push all those to the remote branch: `git push` and then copy and paste the upstream command it hands you
3. Go to Github.com and navigate to our repo. At the top, it should recognize that you've just pushed a branch remotely. There should be a nice green button on the right to immediately make a pull request.
4. If not, then click `New pull request` in the top left. Select or type your branch name in the Compare dropdown (leave Base as master).
5. Fill out a title, add a description with the changes/edits you made, and add at least two reviewers for the pull request.
6. If anyone makes comments, fix them on your branch. Add, commit, and then push again. Bug that person to confirm that your changes addressed your comments.
7. At the bottom of the PR, click squash and merge, or whatever green button appears to finish the pull request.

If you're still lost, here's more on making a [pull request](https://help.github.com/articles/creating-a-pull-request/) and how to merge the [code](https://help.github.com/articles/merging-a-pull-request/).

### Trouble-Shooting
- First clone fresh repo
- Delete whatever package-lock was
- Make sure there’s no node_module directory
- `npm cache clean` (hopefully that will catch something)
- (If not) clear npm cache with `npm cache clear`
- Now `npm install`

