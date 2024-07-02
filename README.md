### Intro
Welcome back to my repo, this will be a quick overview of this project( an Events Management API), it's installation guide and all you need to know to get started and scale.
This App is used to handle Users and their events. Each user has the ability to create an account, login, create an event with a Date and Description, read and delete this event/s if needed.
I went ahead to implement unit testing with **jest**. The test was carried out with heavy mocking via jest. A global coverage threshold of 50% (lines) was maintained in the project, feel free to add more tests.

### Installation
- As always, the first step is cloning this repo.
- After cloning, run **npm install** to get the dependencies in the package.json file.
- The program is set to run in Nodemon watch mode by running **npm  start**, you can tweak this feature to suite your needs in the **scripts** of your **package.json** file.
- Add a **.env** file in the root directory of the project, this file will contain globally needed variables such as:
1: A '**MONGO_URL**' which will be the url to your mongo db table.
2: A '**JWT_SECRET**' this is the secret character used to create and decode your web token.
- The local server is set to run default on **port 3000** so check to make sure the port is available or change the port number to suite your preference.
- You can test your setup by running **npm start**, the appropriate response should be '**Server is listening on port ${port number}...**' logged on your console.

### Usage
- This Application is an API that enables users create an event and it works by;
- Step 1: create a user.
- Step 2: sign in with the created user's email and password.
- Step 3: the sign-in returns a token which is used to access the event routes. You can now create, read and delete event/s.

### API Endpoints
This API contains 7 endpoints, 2 for the users and 5 for events.
- | POST | '**localhost:3000/api/v1/users/sign-up**'  //this endpoint creates a user.
- | POST | '**localhost:3000/api/v1/users/sign-in**'  //this endpoint logs in a user.
- | POST | '**localhost:3000/api/v1/events**'  //this endpoint creates an event.
- | GET | '**localhost:3000/api/v1/events**'  //this endpoint gets an event or events that match the request.
- | GET | '**localhost:3000/api/v1/events/:id**'  //this endpoint gets an event that matches the parameter's id.
- | DELETE | '**localhost:3000/api/v1/events**'  //this endpoint deletes an event or events that match the request.
- | DELETE | '**localhost:3000/api/v1/events/:id**'  //this endpoint deletes an event that match the parameter's id.

### Technologies
- Typescript: (Javascript framework)
- JSON Web Token: (for creating and handling web tokens)
- Jest: (Unit testing type)
- Mongoose: (Mongo DB package)
- Mongo DB: (Database storage and management)
- ES Lint Prettier: (For linting and code formatting)
- Express: (Node JS package)
- Bcrypt: (For password hashing)
- Joi: (Input validation middleware)
- Http Status Codes: (For better handling of web request and response tasks)
- Dotenv: (Handles descrete global variables)

### Acknowledgements
- Yours truly.
- Several blogs,  etc.