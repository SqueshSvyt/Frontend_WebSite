document.addEventListener("DOMContentLoaded", function() {
    const playlistsData = [
        {imgSrc: "./images/No_image.jpg", title: "Playlist 1", description: "Description of Playlist 1"},
        {imgSrc: "./images/No_image.jpg", title: "Playlist 2", description: "Description of Playlist 2"},
        {imgSrc: "./images/No_image.jpg", title: "Playlist 3", description: "Description of Playlist 3"},
        {imgSrc: "./images/No_image.jpg", title: "Playlist 4", description: "Description of Playlist 4"},
        {imgSrc: "./images/No_image.jpg", title: "Playlist 5", description: "Description of Playlist 5"}
    ];

    let currentIndex = 0;
    const playlistsPerPage = 3;

    const container = document.getElementById("playlistContainer");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    function renderPlaylists(startIndex) {
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

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + playlistsPerPage >= playlistsData.length;
    }

    renderPlaylists(currentIndex);

    prevButton.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderPlaylists(currentIndex);
        }
    });

    nextButton.addEventListener("click", function() {
        if (currentIndex + playlistsPerPage < playlistsData.length) {
            currentIndex += 1;
            renderPlaylists(currentIndex);
        }
    });

    // $('#navbar-toggler-btn').click(function(){
    //     $('#navbarSupportedContent').toggleClass('show');
    // });
});