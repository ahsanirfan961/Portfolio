
import { optionsButtonListener } from "./header-script.js";

loadDependencies().then(()=>{
    optionsButtonListener();
    loadData();
})

function loadHeader() {
    return fetch('elements/header.html').then(response => response.text()).then(data => {
        document.getElementById('header').innerHTML = data;
    }).catch(error => {
        console.error('Error loading: ', error);
    });
}
function loadIntroduction() {
    return fetch('elements/intro-card.html').then(response => response.text()).then(data => {
        document.getElementById('contents').innerHTML += data;
    }).catch(error => {
        console.error('Error loading: ', error);
    });
}

function loadData() {
    fetch('data.json').then(response => response.json()).then(data => {
        document.getElementById('name').innerText = data.name;
        document.getElementById('position-statement').innerText = data.position_statement;
        document.getElementById('front-page-description').innerText = data.front_page_description;
        document.getElementById('date-of-birth').innerText = data.date_of_birth;
        document.getElementById('mobile').innerText = data.mobile;
        document.getElementById('email').innerText = data.email;
        document.getElementById('address').innerText = data.address;
        document.getElementById('facebook').addEventListener('click', function () {
            window.open(data.facebook, '_blank', 'noopener,noreferrer');
        });
        document.getElementById('instagram').addEventListener('click', function () {
            window.open(data.instagram, '_blank', 'noopener,noreferrer');
        });
        document.getElementById('linkedin').addEventListener('click', function () {
            window.open(data.linkedin, '_blank', 'noopener,noreferrer');
        });
        document.getElementById('github').addEventListener('click', function () {
            window.open(data.github, '_blank', 'noopener,noreferrer');
        });
    });
}

function loadDependencies()
{
    return Promise.all([loadHeader(), loadIntroduction()]);
}