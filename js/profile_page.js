


document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const logoutButton = document.getElementById('logoutButton');
    const token = localStorage.getItem('jwt')

    if (userData) {
        // Update profile details
        document.querySelector('.profile-card .profile-details h2').textContent = userData.username; // Assuming username is stored
        document.querySelector('.profile-card .profile-details p').textContent = `Email: ${userData.email}`; // Assuming email is stored
        // You can add more fields in a similar way

        // For illustrative purposes, let's assume you also store a 'location' and 'bio'
        // You might need to adjust the selectors based on your actual HTML structure
        document.querySelectorAll('.profile-card .profile-details p')[1].textContent = `Location: ${userData.location || 'Not specified'}`;
        document.querySelectorAll('.profile-card .profile-details p')[2].textContent = `Bio: ${userData.bio || 'Not specified'}`;

        function createPlaylistElement(playlist) {
            const element = document.createElement('div');
            element.className = 'playlist';
            element.innerHTML = `
                <h4>${playlist.title}</h4>
                <p>${playlist.description}</p>
                <!-- Add more details as needed -->
            `;
            return element;
        }

        fetch(`http://localhost:8000/api/playlist/by_user/${userData.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token if necessary
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(playlists => {
                const container = document.getElementById('playlistsContainerProfile');

                if (!container) {
                    console.error('Container element not found');
                    return;
                }

                playlists.forEach(playlist => {
                    container.appendChild(createPlaylistElement(playlist));
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }



    logoutButton.addEventListener('click', function(event) {
        // Clear local storage items
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');

        // Optionally, you can manually redirect the user
        // Comment out the line below if you want to use the default href navigation
        window.location.href = '../index.html';
    });
});