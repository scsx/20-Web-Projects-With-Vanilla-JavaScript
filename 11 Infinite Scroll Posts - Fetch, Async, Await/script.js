const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

filter.addEventListener('input', filterPosts);
// Scroll
window.addEventListener("scroll", () => {
    // destructuring: const {}
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

// Fetch posts
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
// Function in the course is not correct and was changed by Tadek's comment:
// https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842326#questions/9601170
let isLoading = false;
async function showLoading() {
    if (isLoading) {
        return;
    }

    page++;
    isLoading = true;
    loading.classList.add("show");

    await showPosts(); // <-- key part!!!

    isLoading = false; // only then do we enable further loading
    // I added a quick setTimeout so we can see the loader at all
    setTimeout(() => {
        loading.classList.remove("show");
    }, 200);
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

// Filter posts
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term)  > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}