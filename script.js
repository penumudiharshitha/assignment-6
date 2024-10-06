// Search button opening and closing
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');

// Login button, to submit details
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

// Menu button causes navbar open for mobile
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

// Changing videos on HomeScreen
let videoBtn = document.querySelectorAll('.vid-btn');

// When scrolled, search bar disappears
window.onscroll = () => {
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
};

/* When click search icon it converts to cross and 
shows search bar */
searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

// Function to toggle forms
function toggleForm(formToShow, formToHide) {
    if (formToHide) {
        formToHide.classList.remove('active');
    }
    if (formToShow) {
        formToShow.classList.add('active');
    }
}

// When clicked on person icon, login form appears
formBtn.addEventListener('click', () => {
    toggleForm(loginForm, null);
});

// When clicked on close button, login form goes
formClose.addEventListener('click', () => {
    toggleForm(null, loginForm);
});

// When "register now" is clicked, show the register form
let registerForm = document.querySelector('.register-form-container');
let registerFormClose = document.querySelector('#register-form-close');
let registerLink = document.querySelector('.login-form-container a[href="#"]');

if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForm(registerForm, loginForm);  // Show register form
    });
}

// When the close button on the register form is clicked, hide it
registerFormClose.addEventListener('click', () => {
    toggleForm(null, registerForm);
});

// Optional: If you want to switch back to the login form from the register form
let loginLink = document.querySelector('#login-link');
if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForm(loginForm, registerForm);
    });
}

// Video button change functionality
videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector("#video-slider").src = src;
    });
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = event.target.email.value; // Get email from form
    const password = event.target.password.value; // Get password from form

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        const loginMessageDiv = document.getElementById('login-message'); // Login message div
        loginMessageDiv.innerHTML = ''; // Clear previous messages
        if (data.message === 'Login successful!') {
            alert(data.message); // Show success message
            // Optionally redirect to another page or update UI
        } else {
            loginMessageDiv.innerHTML = data.message; // Show the error message
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Handle register form submission
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = event.target.name.value; // Get name from form
    const email = event.target.email.value; // Get email from form
    const password = event.target.password.value; // Get password from form
    const confirmPassword = event.target.confirmPassword.value; // Get confirm password from form

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
    })
    .then(response => response.json())
    .then(data => {
        const registerMessageDiv = document.getElementById('register-message'); // Registration message div
        registerMessageDiv.innerHTML = ''; // Clear previous messages
        if (data.message === 'Registration successful!') {
            alert(data.message); // Show success message
        } else {
            registerMessageDiv.innerHTML = data.message; // Show the error message
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});



// Swiper initialization for review slider
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});