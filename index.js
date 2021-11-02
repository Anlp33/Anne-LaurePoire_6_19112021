/**
 * Get JSON data with Fetch
 */

const photographerCard = document.getElementById("profiles");

const getData = async () => {
  return await fetch("./FishEyeData.json").then((res) => res.json());
};

/**
 * Display photographers on html
 */

const userDisplay = async (photographers) => {
  photographers
    .forEach((photographer) => {
      let photographerModel = new Photographer(photographer);
      photographerCard.innerHTML += photographerModel.createHtml();
    })
};

const init = async () => {
  const { photographers } = await getData();
  await userDisplay(photographers);
};

init();
