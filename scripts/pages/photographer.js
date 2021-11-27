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

  galleryDisplay(mediaFilter);

  /**
   *sort media
   */

  const addEventSort = async () => {
    const selectFilter = document.querySelectorAll(".filter-select");
//  

    selectFilter.forEach((filter) =>
      filter.addEventListener("change", function (e) {
            switch (e.target.value) {
              case "likes":
                const popularityFilter = mediaFilter.sort((a, b) => {
                  return b.likes - a.likes;
                });
                gallery.innerHTML = "";
                galleryDisplay(popularityFilter);
                break;

              case "title":
                  const titleFilter = mediaFilter.sort((a, b) => {
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
                gallery.innerHTML = "";
                galleryDisplay(titleFilter);
                break;

              case "date":
                const dateFilter = mediaFilter.sort((a, b) => {
                  let da = new Date(a.date);
                  let db = new Date(b.date);
                  return db - da;
                });
                gallery.innerHTML = "";
                galleryDisplay(dateFilter);
                break;
            }
      })
    );
  };
  addEventSort();
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
};

init();
