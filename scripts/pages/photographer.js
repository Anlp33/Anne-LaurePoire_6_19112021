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
 * Display photographer/medias corresponding to the URL ID
 */
const photographerPage = (photographers, media) => {
  const photographersFilter = photographers.filter(
    (photographer) => photographer.id == photographerPageID
  );

  let photographerModel = new Photographers(photographersFilter[0]);
  photographerIntro.innerHTML = photographerModel.createHtmlPhotographerPage();

  const mediaFilter = media.filter(
    (media) => media.photographerId == photographerPageID
  );

  console.log(mediaFilter);

  /**
   *sort media
   */

//   const addEventSort = async (mediaArray) => {
//     const selectFilter = document.querySelectorAll(".filter-select");

//       selectFilter.forEach((filter) => filter.addEventListener("change", function(e) {
//       console.log(e.target.value);
//           const mediaSort = mediaArray.title.sort();
//       gallery.innerHTML = "";
//           console.log(mediaSort);
//       }));

//   };

  // sort by popularity
    
  
  mediaFilter.sort((a, b) => {
    return b.likes - a.likes;
  });

    mediaFilter.forEach((media) => console.log(media.likes));

  //sort by title
  mediaFilter.sort((a, b) => {
    let ta = a.title.toLowerCase();
    let tb = b.title.toLowerCase();

    if (ta < tb) {
      return -1;
    }
    if (ta > tb) {
      return 1;
    }
    return 0;
  });
    mediaFilter.forEach((media) => console.log(media.title));

  //sort by dates

  mediaFilter.sort((a, b) => {
    let da = new Date(a.date);
    let db = new Date(b.date);
    return db - da;
  });

  mediaFilter.forEach((media) => console.log(media.date));

  galleryDisplay(mediaFilter);
};



/**
 * Display photographers on html
 */

const galleryDisplay = (medias) => {
  medias.forEach((media) => {
    let factory = new PhotographerFactory(media); //donnée fichier json
    gallery.innerHTML += factory.createHtml();
  });
};


const init = async () => {
  const { photographers, media } = await getData();
  photographerPage(photographers, media);
//   await addEventSort(media);
};

init();
