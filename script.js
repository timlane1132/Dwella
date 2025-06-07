"use strict";
// selections
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector(".section-hero");
const sections = document.querySelectorAll("section");

// sticky nav
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting === false) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

// section reveal

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    else entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};

const revealOptions = {
  root: null,
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// feature reveal

const features = document.querySelectorAll(".feature");

const revealFeature = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    else if (entry.target.classList.contains("feature-right")) {
      entry.target.classList.remove("hide-right");
    } else if (entry.target.classList.contains("feature-left")) {
      entry.target.classList.remove("hide-left");
    }
    observer.unobserve(entry.target);
  });
};

const featureObserver = new IntersectionObserver(revealFeature, {
  root: null,
  threshold: 0.3,
});

features.forEach((feature) => {
  featureObserver.observe(feature);
  if (feature.classList.contains("feature-right")) {
    feature.classList.add("hide-right");
  } else if (feature.classList.contains("feature-left")) {
    feature.classList.add("hide-left");
  }
});

// navigation

document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tenant & landlord switch

const switches = document.querySelectorAll(".switch-btn");
const users = document.querySelectorAll(".user");

document
  .querySelector(".switch-buttons")
  .addEventListener("click", function (e) {
    const clicked = e.target;
    if (clicked.classList.contains("switch-btn")) {
      switches.forEach((button) => button.classList.remove("active-btn"));
      users.forEach((user) => user.classList.remove("active-user"));

      clicked.classList.add("active-btn");
      const active = document.querySelector(`.${clicked.getAttribute("id")}`);
      active.classList.add("active-user");
    }
  });

// Get early access

const sectionJoin = document.querySelector(".section-join");

document.querySelector(".nav-btn").addEventListener("click", function () {
  sectionJoin.scrollIntoView({ behavior: "smooth" });
});

// form
const form = document.querySelector(".join-us-form");
const message = document.querySelector(".form-message");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    // message.style.display = "block";
    alert("Thank you, You have been added to waitlist!");
    form.reset(); // Optional: clear form after submission
  } else {
    message.style.display = "block";
    message.textContent = "Oops! Something went wrong.";
    message.style.color = "red";
  }
});

/*
// dark and light mode
const body = document.querySelector("body");
const sectionHeader = document.querySelectorAll(".section-header");
const sectionHow = document.querySelectorAll(".section-how");
const navLink = document.querySelectorAll(".nav-link");
const stepBox = document.querySelectorAll(".step-box");
const midStep = document.querySelectorAll(".mid-step");
const faqBox = document.querySelectorAll(".faq-box");
const joinBox = document.querySelectorAll(".join-box");
const modeIcon = document.querySelectorAll(".mode-icon");

const mode = document.querySelector(".mode");

mode.addEventListener("click", function (e) {
  e.preventDefault();
  const clickedMode = e.target;

  if (clickedMode.classList.contains("dark")) {
    body.classList.add("body-dm");
    //     sectionHeader.forEach((header) =>
    //       header.classList.add("section-header-dm")
    //     );
    sectionHow.classList.add("section-how-dm");
    //     navLink.classList.add("nav-link-dm");
    //     stepBox.classList.add("step-box-dm");
    //     midStep.classList.add("mid-step-dm");
    //     faqBox.classList.add("faq-box-dm");
    //     joinBox.classList.add("join-box-dm");
    //     modeIcon.classList.add("mode-icon-dm");
  }
});
*/

// Faq

const arrowsArr = document.querySelectorAll(".arrows");
const allArrDown = document.querySelectorAll(".arrow-open");
const allArrUp = document.querySelectorAll(".answer-close");

arrowsArr.forEach((arrows) => {
  arrows.addEventListener("click", function (e) {
    const clicked = e.target;
    const allAnswer = clicked.closest(".faq-right").querySelectorAll(".answer");

    allAnswer.forEach((answer) => answer.classList.remove("active-answer"));
    allArrDown.forEach((arrDown) => (arrDown.style.display = "block"));
    allArrUp.forEach((arrUp) => (arrUp.classList.style.display = "none"));
    // console.log(clicked);

    if (clicked.classList.contains("arrow-open")) {
      const answer = clicked.closest(".faq").querySelector(".answer");
      answer.classList.add("active-answer");

      clicked.style.display = "none";
      const arrUp = clicked.closest(".arrows").querySelector(".arrow-close");
      arrUp.style.display = "block";
    }

    if (clicked.classList.contains("arrow-close")) {
      const answer = clicked.closest(".faq").querySelector(".answer");
      answer.classList.remove("active-answer");

      clicked.style.display = "none";
      const arrDown = clicked.closest(".arrows").querySelector(".arrow-open");
      arrDown.style.display = "block";
    }
  });
});
