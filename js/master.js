const colorsLi = document.querySelectorAll(".colors-list li");
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
const showbullets = document.querySelectorAll('.show-bullets span');
const bullets = document.querySelector('.bullets');
const resset = document.querySelector('.settings-box .reset');

if (localStorage.getItem("show-bullets-opt") !== null) {
    if (localStorage.getItem("show-bullets-opt") === `true`) {
        bullets.style.display = `flex`;
        showbullets.forEach(span => {
            span.classList.remove('active');
        })
        showbullets[0].classList.add('active');
    } else {
        bullets.style.display = `none`;
        showbullets.forEach(span => {
            span.classList.remove('active');
        })
        showbullets[1].classList.add('active');
    }
}
// if local storage have color option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty("--mainColor", localStorage.getItem("color_option"));
    // remove active class from all li
    colorsLi.forEach(li => {
        li.classList.remove("active");
        if (li.dataset.color === localStorage.getItem('color_option')) {
            li.classList.add("active");
        }
    });
}
// random background option
let backgroundOption = true;
// variable to control the interval
let backgroundInterval;
// chek if there is local storage background item
let backgroundlocalItem = localStorage.getItem("background_option");
// chek if local storage is not empty
if (backgroundlocalItem !== null) {
    if (backgroundlocalItem === `true`) {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // remove active class from all span
    randomBackEl.forEach(span => {
        span.classList.remove("active");
    });
    // add active class on span
    if (backgroundlocalItem === `true`) {
        randomBackEl[0].classList.add(`active`);
    } else {
        randomBackEl[1].classList.add(`active`);
    }
}

// toggle spin class on icon
let settingButton = document.querySelector(".toggle-settings");
let settingBox = document.querySelector(".settings-box");
let settingIcon = document.querySelector(".icon");
settingButton.onclick = () => {
    settingIcon.classList.toggle('fa-spin');
    settingBox.classList.toggle("open");
};
// switch background
colorsLi.forEach((li) => {
    li.addEventListener('click', (e) => {
        // setting color on root
        document.documentElement.style.setProperty('--mainColor', e.target.dataset.color);
        // set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        // remove active class from all liS
        colorsLi.forEach(li => {
            li.classList.remove("active");
        });
        // add on main
        e.target.classList.add('active');
    })
});
// switch backgrounds
// loop on all span
randomBackEl.forEach((span) => {
    span.addEventListener('click', (e) => {
        // remove active class from all liS
        randomBackEl.forEach(span => {
            span.classList.remove("active");
        });
        // add on main
        e.target.classList.add('active');

        if (e.target.dataset.background === `yes`) {
            backgroundOption = true;
            ramdomizeImgs();
            localStorage.setItem(`background_option`,true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem(`background_option`,false);
        }
    })
});

// select landing page element
let landingPage = document.querySelector(".landing-page");
// get array of imgs
let imgsArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to randomize Imgs
function ramdomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // get random num
            let randomNumber = Math.floor(Math.random() * imgsArr.length);
            // change background img
            landingPage.style.backgroundImage = `url("imgs/${imgsArr[randomNumber]}")`;
        }, 3000);
    }
}
ramdomizeImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
    // skills ofssettop
    let skillsoffsetTop = ourSkills.clientHeight;
    // skills outer hieght
    let skillsOuterHeight = ourSkills.scrollHeight;
    // window heght 
    let windowHieght = window.innerHeight;
    // scroll top 
    let windowScrollTop = window.scrollY;

    if (windowScrollTop > (skillsoffsetTop + skillsOuterHeight - windowHieght)) {
        let allSkills = document.querySelectorAll('.skill-progress span');
        allSkills.forEach(span => {
            span.style.width = span.dataset.progress;
        })
    }
}
// get the photos
let photos = document.querySelectorAll(".images-box img");
// console.log(photos);
photos.forEach(photo => {
    photo.addEventListener("click", (e) => {
        let land = document.createElement('div');
        land.className = `land`;
        // creat the image holder
        let imageHolder = document.createElement("div");
        imageHolder.className = `image-holder`;
        // make the text
        let imageHolderH3 = document.createElement("h3");
        imageHolderH3.textContent = e.target.alt;
        imageHolder.appendChild(imageHolderH3);
        land.appendChild(imageHolder);
        // append the image
        let image = document.createElement('img');
        image.src = e.target.src;
        image.alt = e.target.alt;
        imageHolder.appendChild(image);
        // append the close button
        let closeButton = document.createElement('span');
        closeButton.className = `close`;
        closeButton.textContent = `X`;
        closeButton.onclick = () => land.remove();
        imageHolder.appendChild(closeButton);
        // add to body
        document.body.appendChild(land);
        land.onclick = (e) => e.target.classList.contains(`land`) ? land.remove(): false;
    });
});
// option for show bullets or not
let showbulletsOption = localStorage.getItem("show-bullets-opt");

showbullets.forEach(span => {
    span.addEventListener('click', () => {
        showbullets.forEach(el => {
            el.classList.remove("active");
        })
        span.classList.add("active");
        if (span.classList.contains("No")) {
            localStorage.setItem("show-bullets-opt",false);
            bullets.style.display = `none`;
        } else if (span.classList.contains("Yes")) {
            localStorage.setItem("show-bullets-opt",true);
            bullets.style.display = `flex`;
        }
    })
    
})
// resset the all option
resset.addEventListener('click', () => {
    localStorage.clear();
    location.reload()
})
// link holder click
let lnkHolder = document.querySelector(`.link-holder`);
let linkS = document.querySelector(`.links`);
lnkHolder.addEventListener(`click`, () => {
    linkS.classList.toggle(`show`);
});
document.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`link-holder`)) {
        return false;
    }
    else {
        linkS.classList.remove(`show`)
    }
})