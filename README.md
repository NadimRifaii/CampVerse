<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> CampVerse aims to manage the journey of mentors and students during a bootcamp, by providing a user-friendly paltform having everything they need, creating and submitting assignments, getting ai feedback on students assignments , creating bootcamp weekly schedule , publishing weekly students results and the ability to communicate with users on the platform , all in just one place.

### Admin Stories
- As an admin, I should be able to create new bootcamps and add students and mentors to it
- As an admin, I want the ability to create the bootcamp curriculum containig all the modules and stack that will be given during the bootcamp
- As an admin, I want the ability to create the bootcamp's schedule , assigning sessions to mentors with specific time and specific dates

### Mentor Stories
- As a mentor, I want to create new assignments 
- As a mentor, I want the ability to get ai feedback on any of my students assignments
- As a mentor, I want to publish weekly results to the students in the bootcamp

### Student Stories
- As a student, I have the ability to submit an assignment and upload my files
- As a student, I want to see my private weekly results 
- As a student, I have the ability to see the bootcamp's weekly schedule 



<br><br>
<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  CampVerse is built using the following technologies:

- This project uses the [React Library](https://react.dev/). React is a JavaScript library for building user interfaces. It makes it easy to create reusable components and manage complex UIs, and [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that adds static typing to the language.

- This project uses [Go](https://go.dev/) For the backend side of the application with [Fiber](https://gofiber.io). Fiber is a Go web framework built on top of Fasthttp, the fastest HTTP engine for Go. It's designed to ease things up for fast development with zero memory allocation and performance in mind.

- In addition to [Go](https://go.dev/) with [Fiber](https://gofiber.io) for the main backend functionality, this project uses also [Node.js](https://nodejs.org/en) paired with the [Express.js](https://nodejs.org/en) to handle the real-time features of this project.
- This project uses [MySQL](https://www.mysql.com/) as the primary database which is ideal for applications with structured data, requiring complex queries and a fixed schema.

- This project also uses [MongoDB](https://www.mongodb.com/) for the real time features of the project.

- To send real time messages and notifications, the project uses [Socket.IO](https://socket.io/). Which is a JavaScript library for real time web applications. It enables bidirectional communication between clients and servers in real time .

- This project uses [Electron](https://www.electronjs.org/) For the admin side, electron enable building desktop applications with web libraries and frameworks

<br><br>
<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed CampVerse using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/file/s1JMz99qMQnpwjyfpfi8DR/Final_Project_1?type=design&node-id=0%3A1&mode=design&t=27EwAsazmeALwqCH-1)


### Mockups
| Login | Signup |
| ---| ---|
| ![Login](./readme/mockups/login.png) | ![Signup](./readme/mockups/signup.png) |

| Live chat + notification |
| ---|
| ![Live Chat + Notifications](./readme/mockups/chatting.png) |

| Users list |
| ---|
| ![Live Chat + Notifications](./readme/mockups/users_list.png) |
<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

<img src="./readme/gifs/Final_Schema_V0_MySql (1)_page-0002.jpg" />


<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>

| Landing page |
| ---|
| ![Landing](./readme/gifs/LandingPage-ezgif.com-optimize.gif) |

| Auth screen | Google authentication |
| ---| ---|
| ![Auth Page](./readme/gifs/authPage-ezgif.com-video-to-gif-converter.gif) | ![Google OAuth](./readme/gifs/Google_Oauth-ezgif.com-video-to-gif-converter.gif) |


| Live chat + notification |
| ---|
| ![Live Chat + Notifications](./readme/gifs/RealTime.gif) |

| AI feedback on student assignment |
| ---|
| ![ai feedback](./readme/gifs/ai_feedback_on_assignment.gif) |


# Admin Screens


| Home screen  | Edit profile |
| ---| ---|
| ![Home](./readme/gifs/Admin_home_page-ezgif.com-video-to-gif-converter.gif) | ![update profile](./readme/gifs/Update_profile-ezgif.com-video-to-gif-converter.gif) |

| Search users  | Add user to bootcamp |
| ---| ---|
| ![Search users](./readme/gifs/Search_users.gif) | ![add user to bootcamp](./readme/gifs/Admin_add_user_to_bootcamp-ezgif.com-video-to-gif-converter.gif) |

| Add weekly modules  | Create bootcamp schedule |
| ---| ---|
| ![Weekly modules](./readme/gifs/Admin_add_curriculum-ezgif.com-video-to-gif-converter.gif) | ![create bootcamp schedule](./readme/gifs/Admin_create_schedule-ezgif.com-video-to-gif-converter.gif) |

# Mentor Screens

| Assignment statistics  | Create assignment |
| ---| ---|
| ![Assignment statistics](./readme/gifs/assignments_statistics.png) | ![create bootcamp schedule](./readme/gifs/create_assignment.png) |

| Weekly results |
| ---|
| ![Weekly results](./readme/gifs/Weekly_results.gif) |
<br><br>


<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

###  Mastering AI Interaction: Unveiling the Power of Prompt Engineering:

- This project uses advanced prompt engineering techniques to optimize the interaction with natural language processing models. By skillfully crafting input instructions, we tailor the behavior of the models to achieve precise and efficient language understanding and generation for various tasks and preferences.

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###  Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- This project leverages AWS deployment strategies to seamlessly integrate and deploy natural language processing models. With a focus on scalability, reliability, and performance, we ensure that AI applications powered by these models deliver robust and responsive solutions for diverse use cases.

<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
   npm install npm@latest -g
  ```
* Go <br>
   Make sure you have Go installed on your machine. You can download and install it from the official website: [Go](https://golang.org/dl)
* Database <br>
   You need to ensure that [XAMPP](https://www.apachefriends.org/), [MySQL](https://dev.mysql.com/downloads/installer/) are installed on your device.
   
### Installation

1. Get an openAI API Key from [openai](https://openai.com/)
2. Clone the repo
   git clone [github](https://github.com/NadimRifaii/CampVerse.git)
3. Setup the frontend
   ```sh
   cd client
   npm install
   ```
   Then go to .env.example file, rename it to .env and populate the values
   ```sh
   REACT_APP_FIREBASE_API_KEY=
   REACT_APP_FIREBASE_AUTH_DOMAIN=
   REACT_APP_FIREBASE_PROJECT_ID=
   REACT_APP_FIREBASE_STORAGE_BUCKET=
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
   REACT_APP_FIREBASE_APP_ID=
   ```
   - Go to the Firebase Console: [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Create a new project or select an existing one.
   - In the project dashboard, click on add an app icon "choose add web app"
   - Register the app 
   - Copy and paste the values into the .env file.
3. Setup the go backend <br>
   Open [phpMyAdmin](http://localhost/phpmyadmin/) and create a database called `campverse_db`
   ```sh
   cd server-go
   go mod download
   ```
   Then go to .env.example file, rename it to .env and populate the values
   ```sh
   secret="This can be whatever you want"
   OPENAI_API_KEY=
   ```
4. Setup the node backend <br>
   ```sh
   cd server-node
   npm install
   ```
   - Create a MongoDB Atlas account:
   1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   2. Sign up for an account or log in if you already have one.
   3. Create a new cluster for your project.
   - Get the Connection URL:
   1. In you Atlas dashboard, go to the cluster you just created
   2. Click on the "connect" button
   3. Choose Drivers option
   4. Copy the connection string. It will look something like this:
     ```sh
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>
     ```
     Replace `<username>`, `<password>`, and `<database>` with your actual MongoDB Atlas credentials.
   - Now rename the .env.example file to .env and put the connection string in the MONG_URL variable
   ```sh
   MONG_URL=
   secret="This can be whatever you want"
   ```
5. Setup electron
   ```sh
   cd electron
   npm install
   ```
Now, you should be able to run CampVerse locally and explore its features.
