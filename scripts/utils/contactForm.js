const form = document.getElementById("form");
const modal = document.getElementById("contact_modal");
const input = document.querySelectorAll(".text-control");
const button = document.getElementById("close_Button");


function displayModal() {
  console.log('ok')
  modal.setAttribute("aria-hidden", "false");
  modal.style.display = "block";
  main.style.display = "none";
  main.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "true");
  header.style.display = "none";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  main.style.display = "block";
  header.style.display = "block";
  main.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "false");
}
/**Open modal when click on button*/

function addEventModal() {
  const buttonContact = document.getElementById("contact_button");
  buttonContact.addEventListener("click", displayModal);
}

/**
 * Close modal when click on button
 */

button.addEventListener("click", closeModal);

/**
 * Close modal when key pressed ECHAP
 */
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

/**
 * Form submission
 */

form.addEventListener("submit", (e) => {
  input.forEach((input) => {
    console.log(input.value);
  });
  e.preventDefault();
  form.reset();
  closeModal();
});
