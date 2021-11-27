/**
 * Get JSON data with Fetch
 */

const photographerCard = document.getElementById("profiles");

const getData = async () => {
  return await fetch("./data/FishEyeData.json").then((res) => res.json());
};

/**
 * Display photographers on html
 */

let photographerDisplay = (photographers) => {
  photographers.forEach((photographer) => {
    let photographerModel = new Photographers(photographer);
    photographerCard.innerHTML += photographerModel.createHtml();
  });
};

/**
 * Event when click on tag
 * @param {*} photographerArray
 */
const addEventTag = async (photographerArray) => {
  const classtag = document.querySelectorAll(".classTag");

  classtag.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      const photographersFilter = photographerArray.filter((photographer) =>
        photographer.tags.includes(
          e.target.innerText.toLowerCase().replace("#", "")
        )
      );
      photographerCard.innerHTML = "";
      photographerDisplay(photographersFilter);
    });
  });
};


const init = async () => {
  const { photographers } = await getData();
  photographerDisplay(photographers);
  await addEventTag(photographers);
};

init();
