
export function optionsButtonListener() {
    let optionsButton = document.getElementById('options-btn');
    optionsButton.addEventListener('click', function () {
        const optionList = document.getElementById('header-list');
        const navBar = document.getElementById('nav-bar');
        if (optionList.classList.contains('active')) {
            optionsButton.innerHTML = '<i class="fa-solid fa-bars"></i>'
            optionList.classList.remove('active');
        } else {
            optionsButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            optionList.classList.add('active');
        }
    });
}
