const form = document.getElementById("form"),
    search = document.getElementById("search"),
    result = document.getElementById("result"),
    more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Dev
function log(t) {
    console.log(t);
}

// Search by term
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

function showData(results) {
    result.innerHTML = `
    <ul class="songs">
        ${results.data
            .map(
                (song) => `
            <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>`
            )
            .join("")}
    </ul>
  `;

    const morePrev = results.prev,
        moreNext = results.next;

    if (morePrev || moreNext) {
        more.innerHTML = `
        ${
            morePrev
                ? `<button class="btn" onclick="getMoreSongs('${morePrev}')">Prev</button>`
                : ""
        }
        ${
            moreNext
                ? `<button class="btn" onclick="getMoreSongs('${moreNext}')">Next</button>`
                : ""
        }
      `;
    } else {
        more.innerHTML = "";
    }
}

async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// Get lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r\r|\n\n)/g, '</br>');

    result.innerHTML = `
        <h2>${artist} - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;

    more.innerHTML = '';
}

// Event listeners
// Form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert("Type something!");
    } else {
        searchSongs(searchTerm);
    }

    searchSongs(searchTerm);
});

// Get lyrics
result.addEventListener("click", (e) => {
    const clickedEl = e.target;

    if (clickedEl.tagName === "BUTTON") {
        const artist = clickedEl.getAttribute("data-artist"),
            songTitle = clickedEl.getAttribute("data-songTitle");

        getLyrics(artist, songTitle);
    }
});
