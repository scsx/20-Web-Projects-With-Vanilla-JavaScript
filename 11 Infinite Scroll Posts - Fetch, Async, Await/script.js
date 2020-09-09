const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

window.addEventListener('scroll', () => {
    // destructuring: const {}
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight) {
        showLoading();
    }
})

let limit = 5;
let page = 1;

// fetch posts
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();
    return data; // will be promise
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach((post) => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title" style="
                    background-color: ${getRandomColor()};
                    color: ${getRandomColor()}">
                    ${post.title}
                </h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postEl);
    });
}

// Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(() => { 
            page++;
            showPosts();
            console.log(onePageAtATime, page);
        }, 500);
    }, 1000);
    
}

// Show initial posts
showPosts();

// Random colors - not in the course
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
