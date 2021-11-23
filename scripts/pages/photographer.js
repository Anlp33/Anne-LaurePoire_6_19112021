/**
 * Get JSON data with Fetch
 */
const photographerIntro = document.getElementById("photographer_intro");
const gallery = document.getElementById("gallery");

const getData = async () => {
  return await fetch("./data/FishEyeData.json").then((res) => res.json());
};

/**
 * Get photographer ID in URL
 */
const urlID = window.location.search; //?id=930
const photographerPageID = urlID.match(/\d/g).join("");

// URLSearchParams;
// const params = new URLSearchParams(document.location.search.substring(1));
// const identifier = params.get("id");

/**
 * Display photographer corresponding to the URL ID
 */
const photographerId = (photographers) => {
  const photographersFilter = photographers.filter(
    (photographer) => photographer.id == photographerPageID
  );
  console.log(photographersFilter);

  //   let photographerDisplay = (photographers) => {
  // photographers.forEach((photographer) => {
  let photographerModel = new Photographers(photographersFilter[0]);
  photographerIntro.innerHTML = photographerModel.createHtmlPhotographerPage();
  // });
  //   };
  //   photographerDisplay(photographersFilter);
  const galleryMedia = galleryDisplay(galleryMedia); //cmt je fais pour récupérer média qui appartiennent à ce photographer, filter par rapport à l'id du photographe
};

/**
 * Display photographers on html
 */

const galleryDisplay = (medias) => {
  medias.forEach((media) => {
    let factory = new PhotographerFactory(media); //donnée fichier json
    console.log(media);
    gallery.innerHTML += factory.createHtml();
  });
};

const init = async () => {
  const { photographers, media } = await getData();
  photographerId(photographers);
  console.log(media);
};

init();
