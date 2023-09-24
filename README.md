# Simple Blogging Platform

# Description
Welcome to the Simple Blogging Platform! This platform enables users to view, create, and comment on blogs. This README.md file will guide you through the steps to run the project locally.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Author](#Author)

## Features

- **All Blogs:** View a list of all blogs available on the platform.
- **Read Blog:** Dive into the content of each blog to explore new ideas and stories.
- **Create Blog:** Easily create new blogs by providing a title and content.
- **Update Blog:** Edit and update existing blogs to keep your content fresh.
- **Add Comments:** Engage with the blogs by adding comments to share your thoughts and opinions.


## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.
- Node.js: [Download and Install Node.js](https://nodejs.org/)

Follow these steps to run the Simple Blogging Platform locally:

1. **Create a folder Blogging-Platform:**

2. **Install Dependencies:**

   ```bash
   npm install express pg body-parser
   ``` 

3. **Create a DB in postgress as BlogPlatform:**

     Create the 'blogs' table
   ```bash
        CREATE TABLE blogs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT
        );
   ```
     Create the 'comments' table
   ```bash
       CREATE TABLE comments (
         id SERIAL PRIMARY KEY,
         blog_id INT REFERENCES blogs(id),
         content TEXT
       );
   ``` 
  

4. **Run:**

   ```bash
      node server.js
   ``` 


## Usage

1. **View All Blogs:** 
2. **Create a New Blog:**
3. **Update a Blog:**
4. **Add Comments:**
5. **Read a Blog:**


## Screenshots

<p align="center">
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/1.Home%20Page.png" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/2.Create%20Blog.png" alt="Screenshot 2" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/3.BlogDetailsWithoutComments.png" alt="Screenshot 3" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/4.b-Comments.png" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/4.BlogDetailsWithComments.png" alt="Screenshot 2" width="300" />
</p


## Author

SAURABH KUMAR RAI

