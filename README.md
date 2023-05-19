# Ice Breaker
Masters Project 295B

## Contributors
Ealrada Piroyan (SID:0 12181481)
Achal Rajyaguru (SID: 015958670)
Vanita Rani (SID: 009888801)

## Steps to Run the Code (Frontend)

1. Open your terminal and set the location where you want to clone the repository
2. Type " git clone https://github.com/achalrajyaguru/ice-breaker "
3. Open the folder name ice-breaker
4. Delete the package-lock.json file
5. Open your code editor and redirect to the client folder and type " npm install " in your terminal
6. Do the same for the server folder and instal the required node modules
7. Once you are finished step 1 to 6, redirect your terminal to "client" folder and type " npm start " in the terminal
8. This sghould start the front end on localhost:8000


## Steps to Run the Code (backend)
### Prerequisite : Follow the steps to run the Frontend

1. Open the index.js file and look for the MongoDB url link
2. You can paste the link to your MongoDB collection here or you can use the same database that I have used
3. Open the server folder in your terminal and type " npm run start:backend "
4. This should start the backend server on localhost:3000 port and the app is ready to run



## Recommended future upgrades
#### For anybody who want to enhance this project:

1. In its present state app uses Authentication tokens to login a users and the user data is not stored locally, adding protected routes will be a good start when developing this application further
2. The user chat is only updated when the page is refresh, a good addition would be to add a SW3 bucket which updates the user chat without refreshing the application
3. I have added the swipe up and down feature but there are no particular actions associated with it, adding a super like to swipe up would be a good start
4. I have only displayed the user names, a good addition would be to enlarge the user cards and add their hobbies and description underneath them

