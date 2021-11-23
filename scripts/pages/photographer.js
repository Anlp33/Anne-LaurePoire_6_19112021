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
const photographerId = (photographers, media) => {
  const photographersFilter = photographers.filter(
    (photographer) => photographer.id == photographerPageID
  );
  console.log(photographersFilter);

  let photographerModel = new Photographers(photographersFilter[0]);
  photographerIntro.innerHTML = photographerModel.createHtmlPhotographerPage();

    const mediaFilter = media.filter(
    (media) => media.photographerId == photographerPageID
    )
    
    galleryDisplay(mediaFilter);
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
    console.log(media)
    photographerId(photographers, media);
  };

init();
