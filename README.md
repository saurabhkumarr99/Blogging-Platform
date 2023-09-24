# Simple Blogging Platform

# Description
Welcome to the Simple Blogging Platform! This platform enables users to view, create, and comment on blogs. This README.md file will guide you through the steps to run the project locally.

## Prerequisites

Before you get started, make sure you have the following software and tools installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)

## Getting Started

Follow these steps to run the Simple Blogging Platform locally:

1. **Create a folder Blogging-Platform:**

2. **Install Dependencies:**

   ```bash
   npm install express pg body-parser
   ``` 

3. **Create a DB in postgress as BlogPlatform:**

   ```bash
   -- Create the 'blogs' table
        CREATE TABLE blogs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT
        );

  -- Create the 'comments' table
       CREATE TABLE comments (
         id SERIAL PRIMARY KEY,
         blog_id INT REFERENCES blogs(id),
         content TEXT
       );

  ``` 
2. **Run :**

   ```bash
  node server.js
   ``` 


## Author

- SAURABH KUMAR RAI
