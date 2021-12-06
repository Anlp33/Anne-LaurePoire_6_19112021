function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


/**
 * Form global validation
 */
const form = document.getElementById("form");
const modal = document.getElementById("contact_modal");

const input = document.querySelectorAll(".text-control");

form.addEventListener("submit", (e) => {
    input.forEach((input) => {
    console.log(input.value);
 })
    e.preventDefault();
    form.reset();
    closeModal();
});
