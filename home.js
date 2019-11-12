document.querySelector('.navbar-icon').addEventListener('click', showMenuBar);
document.querySelector('.menu-icon').addEventListener('click', hideMenuBar);


function showMenuBar(){
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.menu-bar').style.display = 'block';
}

function hideMenuBar(){
    document.querySelector('.navbar').style.display = 'flex';
    document.querySelector('.footer').style.display = 'block';
    document.querySelector('.about').style.display = 'flex';
    document.querySelector('.menu-bar').style.display = 'none';
}