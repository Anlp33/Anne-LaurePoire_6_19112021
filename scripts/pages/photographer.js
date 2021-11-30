/**
 * Get JSON data with Fetch
 */
const photographerIntro = document.getElementById("photographer_intro");
const gallery = document.getElementById("gallery");
const modalLightbox = document.getElementById("modalLightbox");

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
 * Display photographer and medias corresponding to the URL ID
 */

// display photographer corresponding to the one clicked on main page
const photographerPage = (photographers, media) => {
  const photographersFilter = photographers.filter(
    (photographer) => photographer.id == photographerPageID
  );

  let photographerModel = new Photographers(photographersFilter[0]);
  photographerIntro.innerHTML = photographerModel.createHtmlPhotographerPage();

  // display media corresponding to the photographer
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
            modalLightbox.innerHTML = "";
            galleryDisplay(titleFilter);
            break;

          case "date":
            const dateFilter = mediaFilter.sort((a, b) => {
              let da = new Date(a.date);
              let db = new Date(b.date);
              return db - da;
            });
            gallery.innerHTML = "";
            modalLightbox.innerHTML = "";
            galleryDisplay(dateFilter);
            break;
        }
      })
    );
  };
  addEventSort();

  /**
   * Lightbox
   */

  const addEventLightbox = () => {
    const medias = document.querySelectorAll(".media");
    console.log(medias)
    const closeModalLightbox = document.getElementById("closeLightbox");
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const mediaLightbox = document.getElementById("media-lightbox");

    // Open the Modal
    function openModal() {
      document.getElementById("modalLightbox").style.display = "flex";
      main.style.display = "none";
      header.style.display = "none";
    }

    medias.forEach((media) =>
      media.addEventListener("click", function () {
        console.log('ok')
        openModal();
      })
    );

    // Close the Modal
    function closeModal() {
      document.getElementById("modalLightbox").style.display = "none";
      header.style.display = "block";
      main.style.display = "block";
    }
    closeModalLightbox.addEventListener("click", closeModal);
  };

  addEventLightbox();
};

/**
 * Display photographers on html
 */

const galleryDisplay = (medias) => {
  medias.forEach((media) => {
    let factory = new MediaFactory(media);
    gallery.innerHTML += factory.createHtml();
    modalLightbox.innerHTML += factory.createMediaLightbox();
  });
};

   
const init = async () => {
  const { photographers, media } = await getData();
  photographerPage(photographers, media);
};

init();
