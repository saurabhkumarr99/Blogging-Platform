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
