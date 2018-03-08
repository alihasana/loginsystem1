# loginSystem
----------------------------------------
Back end
Login System with JWT and NodeJS

Make sure that you mangodb is running in your system

'npm install' , then remane file example.env to .env

You have use Postman as a Front end

npm start to lauch the app

Create user and find the token
POST localhost:1407/user/create
----------
Header is  'X-Auth' = User token

To Dispaly the list of user and other details 
GET localhost:1407/user
----------
To Dispaly the one user information by ID
Get localhost:1407/user/:id
----------
To Dispaly the message of the user 
GET localhost:1407/user/message (In Progress)
------------------------------------

Front end is not linked in our project 