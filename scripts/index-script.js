
import { optionsButtonListener } from "./header-script.js";

loadDependencies().then(()=>{
    addAllListeners();
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
        loadIntroCardData(data);
        loadAboutSectionData(data);
    });
}

function loadIntroCardData(data) {
    // Data to Intro Card
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
}

function loadAboutSectionData(data) {

    // Front page description
    document.getElementById('front-page-description-2').innerText = data.front_page_description_2;

    // Achievements
    const achievements = document.getElementById('achievements');
    data.achievements.forEach(element => {
        const achievement = document.createElement('div');
        achievement.className = "achievement-box";

        let logo = document.createElement('i');
        logo.className = element.logo;
        let heading = document.createElement('h2');
        heading.innerText = element.heading;
        let subHeading = document.createElement('h4');
        subHeading.innerText = element.sub_heading;

        achievement.appendChild(logo);
        achievement.appendChild(heading);
        achievement.appendChild(subHeading);

        achievements.appendChild(achievement);
    });

    // Skills
    const skills = document.getElementById('skills');
    data.skills.forEach(element => {
        const skill = document.createElement('div');
        skill.className = 'skill';

        let heading = document.createElement('h4');
        heading.innerText = element.name + ' ' + element.percentage;

        let progress = document.createElement('div');
        progress.style.width = element.percentage;  
        let middle = document.createElement('div');
        middle.appendChild(progress);
        let progressBar = document.createElement('div');
        progressBar.appendChild(middle); 
        progressBar.className = 'progress-bar';
        
        skill.appendChild(heading);
        skill.appendChild(progressBar);

        skills.appendChild(skill);
    });
}

function loadDependencies()
{
    return Promise.all([loadHeader(), loadIntroduction()]);
}

function addAllListeners() {
    addScrollListeners();
    optionsButtonListener();
}

function addScrollListeners() {
    document.addEventListener('scroll', function () {
        const header = document.getElementById('nav-bar');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
        else {
            header.classList.remove('scrolled');
        }
    });
}9