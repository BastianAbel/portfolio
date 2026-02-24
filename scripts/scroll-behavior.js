let currentCategory = 0;
let scrollCooldown = 0;
const classNames = {
    'selected' : 'current-selected-bullet',
    'darkColor' : 'dark-bullet',
    'darkLogo' : 'dark-logo'
}
const navbarBulletIDs = [
    'hero-bullet',
    'about-me-bullet',
    'skills-bullet',
    'portfolio-bullet',
    'references-bullet',
    'contact-footer-bullet'
];
const navbarIDs = [
    'hero',
    'about-me',
    'skills',
    'portfolio',
    'references',
    'contact-footer'
];

function switchCategory(categoryNr) {
    let wantedCategory = categoryNr;
    changeCurrentSelectedBullet(wantedCategory);
    toggleButtonContrast(wantedCategory);
    toggleLogoDisabled(categoryNr);
    updateHeader(categoryNr);
    currentCategory = wantedCategory;
}

function changeCurrentSelectedBullet(categoryNr) {
    const oldBulletRef = document.getElementById(navbarBulletIDs[currentCategory]);
    const newBulletRef = document.getElementById(navbarBulletIDs[categoryNr]);
    oldBulletRef.classList.remove(classNames['selected']);
    newBulletRef.classList.add(classNames['selected']);
}

function toggleButtonContrast(categoryNr) {
    if([1,3].includes(categoryNr)) {
        setContrast();
    }else {
        removeContrast();
    }
}

function toggleLogoDisabled(categoryNr) {
    const buttonRef = document.getElementById('header-logo');
    if([0].includes(categoryNr)) {
        buttonRef.disabled = true;
    }else {
        buttonRef.disabled = false;
    }
}

function setContrast() {
    const headerRef = document.getElementById('header-logo');
    headerRef.classList.add(classNames['darkLogo']);
    for (let b = 0; b < navbarBulletIDs.length; b++) {
        const bulletRef = document.getElementById(navbarBulletIDs[b]);
        bulletRef.classList.add(classNames['darkColor']);
    }
}

function removeContrast() {
    const headerRef = document.getElementById('header-logo');
    headerRef.classList.remove(classNames['darkLogo']);
    for (let b = 0; b < navbarBulletIDs.length; b++) {
        const bulletRef = document.getElementById(navbarBulletIDs[b]);
        bulletRef.classList.remove(classNames['darkColor']);
    }
}

function updateHeader(categoryNr) {
    const headerRef = document.getElementById('header-logo');
    if([0].includes(categoryNr)) {
        headerRef.classList.remove('scrolled');
    }else {
        headerRef.classList.add('scrolled');
    }
}

function scrollToSection(sectionNr) {
    switchCategory(sectionNr);
    const elementRef = document.getElementById(navbarIDs[sectionNr]);
    elementRef.scrollIntoView();
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowDown') {
        scrollDown();
    } else if(event.key === 'ArrowUp') {
        scrollUp();
    }
}
)

window.addEventListener("wheel", (event) => {
    const currentTime = new Date().getTime();
    if(scrollCooldown + 300 < currentTime) {
        if (event.deltaY > 0) {
            scrollDown();
        } else if (event.deltaY < 0) {
            scrollUp();
        }
        scrollCooldown = currentTime;
    }
});

function scrollDown() {
    if(currentCategory < 5) {
        scrollToSection(currentCategory + 1);
    }
}

function scrollUp() {
    if(currentCategory > 0) {
        scrollToSection(currentCategory - 1);
    }

}
    
document.addEventListener("DOMContentLoaded", () => {
  const scrollPos = window.scrollY;
  const spacingTop = 65;
  document.querySelectorAll("section").forEach(section => {
    if (
      scrollPos + spacingTop >= section.offsetTop &&
      scrollPos + spacingTop < section.offsetTop + section.offsetHeight
    ) {
      let category = navbarBulletIDs.indexOf(section.id + '-bullet');
      switchCategory(category);
    }
  });
});