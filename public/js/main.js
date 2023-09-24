document.addEventListener('DOMContentLoaded', () => {
    const blogList = document.getElementById('blog-list');
    const blogForm = document.getElementById('blog-form');

    function createBlogCard(blog) {
        const words = blog.content.split(' ').slice(0, 20);
        const truncatedContent = words.join(' ');

        const card = `<div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text">${truncatedContent}...</p>
                    <a href="#" class="btn btn-primary view-blog" data-blog-id="${blog.id}">Read more</a>
                </div>
            </div>
        </div>`;

        // Create a container div to hold the card
        const cardContainer = document.createElement('div');
        cardContainer.innerHTML = card;

        return cardContainer.firstChild;
    }

    // Load blogs on page load
    fetch('/api/blogs')
        .then((response) => response.json())
        .then((blogs) => {
            blogs.forEach((blog) => {
                const blogCard = createBlogCard(blog);
                blogList.appendChild(blogCard);
            });
        })
        .catch((error) => {
            console.error(error);
        });



    // Handle click events on "Go somewhere" buttons
    blogList.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-blog')) {
            // Get the blog ID from the data-blog-id attribute
            const blogId = e.target.getAttribute('data-blog-id');

            // Navigate to the new blog page with the selected blog's ID
            window.location.href = `/blog-detail.html?id=${blogId}`;
        }
    });


    // Submit new blog form
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
            .then((response) => {
                if (response.status === 201) {
                    // Refresh the page to load the new blog
                    location.reload();
                } else {
                    console.error('Failed to create blog');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });
});
