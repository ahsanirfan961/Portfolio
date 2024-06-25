document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('options-btn').addEventListener('click', function () {
        const optionList = document.getElementById('header-list');
        const navBar = document.getElementById('nav-bar');
        if (optionList.classList.contains('active')) {
            navBar.style.height = '10vh';
            optionList.classList.remove('active');
        } else {
            navBar.style.height = '30vh';
            optionList.classList.add('active');
        }
    });
});
