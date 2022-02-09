const header = document.querySelector(".nav-container")
const sectionOne = document.querySelector(".intro,.intro-contact,.intro-over,.intro-projecten")
const sectionOneOptions = {};
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const menu = document.querySelector ("#mobile-menu")
const menuLinks = document.querySelector(".nav-menu")
const nav = document.querySelector("div")
const layer = document.querySelectorAll(".layer")
const ProjectEl = document.querySelector(".test")
const projectPopup = document.getElementById("popup-id");
const popupCloseBtn = document.getElementById("close-popup");
const projectTest = document.querySelector(".carousel")



let reviews;
let slideIndex = 0;

getProjects();

Array.from(layer).forEach(element => {
  element.addEventListener('click', () => {
    location.href = 'projecten.html';
  });
});


menu.addEventListener("click", function(){
    menu.classList.toggle("is-active")
    menuLinks.classList.toggle("active")
})


const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);


const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);
  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  });



function loadStars(stars){
  const calculatedStars = [];
  for (let i = 0; i < Math.floor(stars); i++){
    calculatedStars.push(`<img src="img/full-star.svg">`);
  }
  if(stars === 5){
    return calculatedStars.map((item) => item).join('');
  }
  if(Number.isInteger(stars)){
    for (let i = 0; i < 5 - stars; i++){
      calculatedStars.push(`<img src="img/empty-star.svg">`);
    }
  } else {
    calculatedStars.push(`<img src="img/half-star.svg">`);
    for (let i = 0; i < 4 - Math.floor(stars); i++){
      calculatedStars.push(`<img src="img/empty-star.svg">`);
    }
  }
  return calculatedStars.map((item) => item).join('');
}

function loadReviews(review){
  return `
    <div class="review">
    <div class="review__headshot">
      <img src="${review.headshot}" alt="${review.name}">
    </div>
    <p class="review__name"><strong>${review.name}</strong></p>
    <p class="review__location">${review.location}</p>
    <div class="review__stars">${loadStars(review.stars)}</div>
    <p class="review__body">${review.body}</p>
  </div>
    `;
}

function moveSlider(e){
  if(e.currentTarget.id.includes('right')){
    slideIndex === reviews.length - 1 ? (slideIndex = 0) : slideIndex++;
  } else {
    slideIndex === 0 ? (slideIndex = reviews.length - 1) : slideIndex--;
  }
  document.querySelector('.reviews').style.transform = `translate(${-100 * slideIndex}%)`;
}


async function fetchReviews() {
  await fetch('user_reviews.json')
  .then((response) => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    reviews = data;
    // 2. Parse the data and create the 'review' divs
    document.querySelector('.reviews').innerHTML = data.map(loadReviews).join('');
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}
fetchReviews();

// 3. Add event listeners to move the slider left and right
document.querySelector('#arrow--right').addEventListener('click', moveSlider);
document.querySelector('#arrow--left').addEventListener('click', moveSlider);



async function getProjects(){
  try{
  let resp = await fetch('projects.json');
  const respData = await resp.json();
  console.log((respData))
  console.log(respData)
  showProjects(respData)
  }catch (error) {
      console.error(error);
    }
}

async function getSingleProjectDb(id){
  try{
  let resp = await fetch('projects.json');
  console.log(id)
  const respData = await resp.json();
  console.log((respData))
  console.log(respData[id])
  showSingleproject(respData[id])
  projectPopup.classList.remove("hidden");
  }catch (error) {
      console.error(error);
    }
}



function showProjects (projects){
projects.forEach(project =>{
  const {id,headerimg, naam, gemaakt,beschrijving } = project

  const projectEl = document.createElement("div");
  projectEl.classList.add("project")
  projectEl.innerHTML = `
  <div class="movie_card" id="bright">
  <div class="info_section">
    <div class="movie_header">
    <img class="locandina" src="${headerimg}"/>
    <h1>${naam}</h1>
    <h4>${gemaakt}</h4>
    </div>
    <div class="movie_desc">
      <p class="text">
      ${beschrijving}
      </p>
      <button" class="clickbtn" onclick="getSingleProjectDb(${id})" >Zie meer foto's</button>
    </div>
  </div>
  <div class="blur_back bright_back"></div>
</div>`

      ProjectEl.appendChild(projectEl)
});



}
function showSingleproject(projects){
    projectTest.innerHTML = ''
    const singeprojectEl = document.createElement("div");
    singeprojectEl.classList.add("project")
    singeprojectEl.innerHTML =`
    <div class="carousel__item carousel__item--visible"> <img src="${projects.imgarr[0]}" /> </div>
    ${projects.imgarr.map(elmt =>  `
    <div class="carousel__item "> <img src="${elmt}" /> </div>`).join('')}
    <div class="carousel__actions">
            <button id="carousel__button--prev" aria-label="Previous slide"><</button>
            <button id="carousel__button--next" aria-label="Next slide">></button>
          </div>
        </div>
    `;
projectTest.appendChild(singeprojectEl)


const slides = document.getElementsByClassName('carousel__item');
const leftBtn = document.getElementById("carousel__button--prev")
const rightBtn = document.getElementById("carousel__button--next")
let slidePosition = 0;
const totalSlides = slides.length;
leftBtn.addEventListener("click", function() {
    moveToNextSlide();
  });
  rightBtn.addEventListener("click", function() {
    moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    console.log(slide.classList.remove('carousel__item--visible'));
  }
  slides[slidePosition].classList.add('carousel__item--visible');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}
}

  
  popupCloseBtn.addEventListener("click", () =>{
    projectPopup.classList.add("hidden");
    console.log("vroom")
  });
