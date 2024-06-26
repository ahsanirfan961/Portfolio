
import { optionsButtonListener } from "./header-script.js";

loadDependencies().then(()=>{
    optionsButtonListener();
})

function loadHeader() {
    return fetch('elements/header.html').then(response => response.text()).then(data => {
        document.getElementById('header').innerHTML = data;
    }).catch(error => {
        console.error('Error loading: ', error);
    });
}

function loadDependencies()
{
    return Promise.all([loadHeader()]);
}