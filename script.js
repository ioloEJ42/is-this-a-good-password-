let input = document.querySelector("#passwordChecker");
let formGroup = document.querySelector(".form-group");
let message = document.querySelector(".message");
let feedbackList = document.querySelector(".feedback"); // Ensure this is declared globally if used across multiple functions
let passTypeToggle = document.querySelector(".passTypeToggle");
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

document.body.addEventListener("click", function (e) {
  if (input.contains(e.target)) {
    formGroup.classList.add("focus");
  } else {
    if (input.value == "") {
      formGroup.classList.remove("focus");
    }
  }
});

let checkPasswordStrength = (password) => {
  let score = 0;
  let feedback = []; // Initialize feedback array here

  // Clear previous feedback
  feedbackList.innerHTML = "";

  // Length check
  if (password.length >= 8) {
    score += 2;
  } else {
    feedback.push("Use at least 8 characters.");
  }

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 2;
  else feedback.push("Include an uppercase letter.");

  if (/[a-z]/.test(password)) score += 2;
  else feedback.push("Include a lowercase letter.");

  if (/[0-9]/.test(password)) score += 2;
  else feedback.push("Include a number.");

  if (/[\W_]/.test(password)) score += 2;
  else feedback.push("Include a special character.");

  // Advanced checks for patterns
  if (/(\d{3,})|([a-zA-Z]{2,})/.test(password)) {
    score -= 2; // Penalize sequences and repeats
    feedback.push("Avoid sequences and repeated characters.");
  }

  // Final assessment
  let strength = "weak";
  if (score >= 8) strength = "strong";
  else if (score >= 5) strength = "medium";

  return {
    strength: strength,
    feedback: feedback, // Return feedback as an array
  };
};

input.addEventListener("keyup", (e) => {
  // Inside your keyup event before adding the class
  li.classList.remove("feedback-message"); // Remove class if it was previously there
  li.offsetHeight; // Force reflow/repaint
  li.classList.add("feedback-message"); // Re-add the class to trigger the animation

  let password = e.target.value;

  password != ""
    ? (passTypeToggle.style.display = "block")
    : (passTypeToggle.style.display = "none");

  if (password == "") {
    message.classList.remove("weak");
    message.classList.remove("medium");
    message.classList.remove("strong");
    formGroup.classList.remove("weak");
    formGroup.classList.remove("medium");
    formGroup.classList.remove("strong");
    message.innerHTML = "";
    feedbackList.innerHTML = ""; // Clear feedback when password is empty
  } else {
    let result = checkPasswordStrength(password);
    message.innerHTML = "This password's strength is: " + result.strength + ".";

    // Clear previous feedback
    feedbackList.innerHTML = "";

    result.feedback.forEach((item) => {
      let li = document.createElement('li');
      li.textContent = item;
      li.classList.add('feedback-item'); // This class will be used for the animation
      feedbackList.appendChild(li);
    });

    message.className = "message " + result.strength; // Add class based on strength
    formGroup.className = "form-group " + result.strength; // Add class based on strength
  }
});

passTypeToggle.addEventListener("click", (e) => {
  if (input.getAttribute("type") == "password") {
    input.setAttribute("type", "text");
    passTypeToggle.setAttribute("title", "Hide");
  } else {
    input.setAttribute("type", "password");
    passTypeToggle.setAttribute("title", "Show");
  }
  document.querySelector(".passTypeToggle i").classList.toggle("fa-eye");
  document.querySelector(".passTypeToggle i").classList.toggle("fa-eye-slash");
});
