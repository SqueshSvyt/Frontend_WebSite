const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(this);  // Create FormData from the form
    const url = 'http://localhost:8000/login/';  // API endpoint

    fetch(url, {
        method: 'POST',
        body: formData  // Send the form data as the request body
    })
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            console.log('Success:', data);
            // Here you can handle the JWT, e.g., store it in localStorage or sessionStorage
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                //localStorage.setItem('userid', data.)
                window.location.href = 'profile.html';
                // Redirect the user or update UI
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Prepare the request data
    const data = {
        username: username,
        email: email,
        password: password
    };

    // Send data to the server via FETCH API
    fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful!');
            window.location.href = '../index.html'; // Redirect to home page or login page
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to register.');
        });
}