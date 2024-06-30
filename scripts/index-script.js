

import { addNavBarListeners, optionsButtonListener } from "./header-script.js";

let data_loaded = '';

loadDependencies().then(() => {
    addAllListeners();
    loadData();
});//then(()=> {
//     window.scrollTo({
//         top: document.getElementById('services-section').offsetTop,
//         behavior: 'instant'
//     });
// });
    
function loadHeader() {
    return fetch('elements/header.html').then(response => response.text()).then(data => {
        document.getElementById('header').innerHTML = data;
    }).catch(error => {
        console.error('Error loading: ', error);
    });
}
function loadFooter() {
    return fetch('elements/footer.html').then(response => response.text()).then(data => {
        document.getElementById('footer').innerHTML = data;
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
function loadTimeline() {
    return fetch('elements/timeline.html').then(response => response.text()).then(data => {
        document.getElementById('contents').innerHTML += data;
    }).catch(error => {
        console.error('Error loading: ', error);
    });
}
function loadServices() {
    return fetch('elements/services.html').then(response => response.text()).then(data => {
        document.getElementById('contents').innerHTML += data;
    }).catch(error => {
        console.error('Error loading: ', error);
    });
}

function loadData() {
    fetch('data.json').then(response => response.json()).then(data => {
        data_loaded = data;
        loadIntroCardData(data);
        loadAboutSectionData(data);
        loadTimelineData(data.experience);
        loadServicesData(data);
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

function loadTimelineData(timeline_data) {
    return fetch('elements/timeline-bar.html').then(response => response.text()).then(barCode => {
        const timeline = document.getElementById('timeline-container');
        timeline.innerHTML = '';
        timeline_data.forEach(element => {
            const timeline_element = document.createElement('div');
            timeline_element.className = 'timeline-element';

            const duration = document.createElement('h4');
            duration.innerText = `${element.from} to ${element.to}`;
            timeline_element.appendChild(duration);

            timeline_element.innerHTML += barCode;

            const contents = document.createElement('div');
            contents.className = 'timeline-element-contents';
            const heading = document.createElement('h2');
            heading.innerText = element.organization;
            const sub_heading = document.createElement('h4');
            sub_heading.innerText = element.position;
            contents.appendChild(heading);
            contents.appendChild(sub_heading);
            timeline_element.appendChild(contents);

            timeline.appendChild(timeline_element);
        });
    });
}

function loadServicesData(data) {
    const services = document.getElementById('services');
    data.services.forEach(element => {
        const service = document.createElement('div');
        service.className = 'service card';

        let logo = document.createElement('img');
        logo.src = element.logo_path;
        let heading = document.createElement('h3');
        heading.innerText = element.title;
        let subHeading = document.createElement('h4');
        subHeading.innerText = element.description;

        service.appendChild(logo);
        service.appendChild(heading);
        service.appendChild(subHeading);

        services.appendChild(service);
    });
}

function loadDependencies() {
    return Promise.all([loadHeader(), loadFooter()]).then(() => loadIntroduction()).then(() => loadTimeline()).then(() => loadServices());
}

function addAllListeners() {
    addScrollListeners();
    optionsButtonListener();
    addNavBarListeners();
    document.getElementById('ed-btn').addEventListener('click', toggleEducation);
    document.getElementById('ex-btn').addEventListener('click', toggleExperience);
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
}

function toggleEducation() {
    const education_button = document.getElementById('ed-btn');
    const experience_button = document.getElementById('ex-btn');

    if (education_button.classList.contains('deselected')) {
        education_button.classList.remove('deselected');
        experience_button.classList.add('deselected');
        loadTimelineData(data_loaded.education);
    }
}

function toggleExperience() {
    const education_button = document.getElementById('ed-btn');
    const experience_button = document.getElementById('ex-btn');

    if (experience_button.classList.contains('deselected')) {
        experience_button.classList.remove('deselected');
        education_button.classList.add('deselected');
        loadTimelineData(data_loaded.experience);
    }
}