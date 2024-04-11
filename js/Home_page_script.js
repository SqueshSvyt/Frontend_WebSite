document.addEventListener("DOMContentLoaded", function() {
    function renderPlaylists(startIndex, playlistsData) {
        container.innerHTML = ""; // Clear existing content

        for (let i = startIndex; i < Math.min(playlistsData.length, startIndex + playlistsPerPage); i++) {
            const playlist = playlistsData[i];
            const playlistHTML = `
          <div class="playlist-col">
            <div class="playlist">
              <img src="${playlist.imgSrc}" alt="${playlist.title}">
              <h4>${playlist.title}</h4>
              <p>${playlist.description}</p>
            </div>
          </div>
        `;
            container.innerHTML += playlistHTML; // Append playlist HTML to container
        }

        // prevButton.disabled = currentIndex === 0;
        // nextButton.disabled = currentIndex + playlistsPerPage >= playlistsData.length;
    }

    fetch('http://127.0.0.1:8000/api/playlist/all/public/', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const playlistsData = data.map(item => ({
                imgSrc: "./images/No_image.jpg", // Assuming you want to use a default image for all
                title: item.title,
                description: item.description
            }));

            renderPlaylists(0, playlistsData)

            console.log(playlistsData);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });


    // let currentIndex = 0;
    const playlistsPerPage = 3;

    const container = document.getElementById("playlistContainer");
    // const prevButton = document.getElementById("prevButton");
    // const nextButton = document.getElementById("nextButton");
});