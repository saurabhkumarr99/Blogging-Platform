const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));


// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'BlogPlatform',
    password: 'admin',
    port: 5432,
});

app.get('/api/blogs', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM blogs');
        const blogs = result.rows;
        client.release();
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the blog ID from the URL parameter
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM blogs WHERE id = $1', [id]);
        const blog = result.rows[0]; 
        if (!blog) {
            // Blog with the specified ID was not found
            res.status(404).json({ error: 'Blog not found' });
        } else {
            // Blog found; send it as JSON response
            res.json(blog);
        }

        client.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/blogs', async (req, res) => {
    const { title, content } = req.body;
    try {
        const client = await pool.connect();
        await client.query('INSERT INTO blogs (title, content) VALUES ($1, $2)', [title, content]);
        client.release();
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle comment submission for a specific blog
app.post('/api/blogs/:id/comments', async (req, res) => {
    const { id } = req.params; // Extract the blog ID from the URL parameter
    const { comment } = req.body; // Extract the comment from the request body

    try {
        // Check if the blog with the specified ID exists
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM blogs WHERE id = $1', [id]);
        const blog = result.rows[0];

        if (!blog) {
            // Blog with the specified ID was not found
            client.release();
            res.status(404).json({ error: 'Blog not found' });
        } else {
            // Blog found; insert the comment into the database associated with the blog
            await client.query('INSERT INTO comments (blog_id, content) VALUES ($1, $2)', [id, comment]);
            client.release();

            // Respond with a success message or appropriate status code
            res.sendStatus(201); // Status 201 indicates success (Created)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/blogs/:id/comments', async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch comments associated with the specified blog ID from the database
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM comments WHERE blog_id = $1', [id]);
        const comments = result.rows;
        client.release();

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
