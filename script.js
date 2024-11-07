const steps = document.querySelectorAll(".step");
const errorMessagesDiv = document.getElementById("errorMessages");
const currentStepDiv = document.querySelector(".currentStep");
const form = document.getElementById("jobApplicationForm");

// Step 1 fields
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

// Step 2 fields
const company = document.getElementById("company");
const jobTitle = document.getElementById("jobTitle");
const yearsExperience = document.getElementById("yearsExperience");

// Step 3 fields
const skills = document.getElementById("skills");
const highestDegree = document.getElementById("highestDegree");

let currentStep = 1;
let errorMsgs = [];

function nextStep() {
  errorMsgs = [];
  errorMessagesDiv.innerText = "";

  switch (currentStep) {
    case 1:
      addValidationErrors(name, email, phone);
      validateStep(errorMsgs);
      break;

    case 2:
      addValidationErrors(company, jobTitle, yearsExperience);
      validateStep(errorMsgs);
      break;

    case 3:
      addValidationErrors(skills, highestDegree);
      validateStep(errorMsgs);
      break;
  }
}

function previousStep() {
  errorMessagesDiv.innerText = "";
  showStep(currentStep - 1);
}

function showStep(step) {
  steps.forEach((el, index) => {
    el.hidden = index + 1 !== step;
  });
  currentStep = step;
  currentStepDiv.innerText = currentStep;
  localStorage.setItem("storedStep", currentStep);
}

function addValidationErrors(fieldOne, fieldTwo, fieldThree = undefined) {
  if (!fieldOne.checkValidity()) {
    const label = document.querySelector(`label[for="${fieldOne.id}"]`);
    errorMsgs.push(`Please Enter A Valid ${label.textContent}`);
  }

  if (!fieldTwo.checkValidity()) {
    const label = document.querySelector(`label[for="${fieldTwo.id}"]`);
    errorMsgs.push(`Please Enter A Valid ${label.textContent}`);
  }

  if (fieldThree && !fieldThree.checkValidity()) {
    const label = document.querySelector(`label[for="${fieldThree.id}"]`);
    errorMsgs.push(`Please Enter A Valid ${label.textContent}`);
  }

  if (errorMsgs.length > 0) {
    errorMessagesDiv.innerText = errorMsgs.join("\n");
  }
}

function validateStep(errorMsgs) {
  if (errorMsgs.length === 0) {
    showStep(currentStep + 1);
  }
}

// Save data on each input event
form.addEventListener("input", () => {
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    company: document.getElementById("company").value,
    jobTitle: document.getElementById("jobTitle").value,
    yearsExperience: document.getElementById("yearsExperience").value,
    skills: document.getElementById("skills").value,
    highestDegree: document.getElementById("highestDegree").value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));
});

// Clear data on form submit
form.addEventListener("submit", () => {
  // Clear localStorage once the form is submitted
  localStorage.removeItem("formData");
  localStorage.removeItem("storedStep");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("formData"));
  const storedStep = localStorage.getItem("storedStep");

  if (savedData) {
    document.getElementById("name").value = savedData.name || "";
    document.getElementById("email").value = savedData.email || "";
    document.getElementById("phone").value = savedData.phone || "";
    document.getElementById("company").value = savedData.company || "";
    document.getElementById("jobTitle").value = savedData.jobTitle || "";
    document.getElementById("yearsExperience").value = savedData.yearsExperience || "";
    document.getElementById("skills").value = savedData.skills || "";
    document.getElementById("highestDegree").value = savedData.highestDegree || "";
  }
  if (storedStep) {
    const storedStepInt = parseInt(storedStep);
    steps.forEach((el, index) => {
      el.hidden = index + 1 !== storedStepInt;
    });
    currentStep = storedStepInt;
    currentStepDiv.innerText = currentStep;
  }
});
