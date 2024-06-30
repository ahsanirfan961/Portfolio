
export function optionsButtonListener() {
    let optionsButton = document.getElementById('options-btn');
    optionsButton.addEventListener('click', function () {
        const optionList = document.getElementById('header-list');
        if (optionList.classList.contains('active')) {
            optionsButton.innerHTML = '<i class="fa-solid fa-bars"></i>'
            optionList.classList.remove('active');
        } else {
            optionsButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            optionList.classList.add('active');
        }
    });
}

export function addNavBarListeners() {
    document.getElementById('about-btn').addEventListener('click', function () {
        const targetElement = document.getElementById('about');
        const offset = -50; 
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        document.getElementById('options-btn').innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.getElementById('header-list').classList.remove('active');
    });
    document.getElementById('experience-btn').addEventListener('click', function () {
        const targetElement = document.getElementById('timeline');
        const offset = -100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        document.getElementById('options-btn').innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.getElementById('header-list').classList.remove('active');
    });
}
