/**
 * Get JSON data with Fetch
 */
const photographerIntro = document.getElementById("photographer_intro");
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const mediaLightboxFrame = document.getElementById("media-lightbox-frame");
const main = document.querySelector("main");
const header = document.querySelector("header");

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
            lightbox.innerHTML = "";
            galleryDisplay(popularityFilter);
            addEventLightbox();
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
            lightbox.innerHTML = "";
            galleryDisplay(titleFilter);
            addEventLightbox();
            break;

          case "date":
            const dateFilter = mediaFilter.sort((a, b) => {
              let da = new Date(a.date);
              let db = new Date(b.date);
              return db - da;
            });
            gallery.innerHTML = "";
            lightbox.innerHTML = "";
            galleryDisplay(dateFilter);
            addEventLightbox();
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
    const mediaGallery = document.querySelectorAll(".media");
    const closeLightboxBtn = document.getElementById("closeLightbox");
    const mediaLightbox = document.querySelectorAll(".media-lightbox")
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");

    function openLightbox() {
      document.getElementById("lightbox").style.display = "flex";
      main.style.display = "none";
      header.style.display = "none";
    }
    function closeLightbox() {
      document.getElementById("lightbox").style.display = "none";
      header.style.display = "block";
      main.style.display = "block";
    }

    mediaGallery.forEach((media) =>
      media.addEventListener("click", function (e) {
        //openModal with all the media from the photograph
        openLightbox();

        mediaLightbox.forEach((media) => {
          const clickedMedia = e.target.attributes.src.nodeValue;
          const mediaSrc = media.childNodes[1].attributes.src.nodeValue;

          if (clickedMedia === mediaSrc) {
            media.style.display = "block";
          } else media.style.display = "none";
        })}));
        

    //close lightbox//

    closeLightboxBtn.addEventListener("click", closeLightbox);
};
  

  addEventLightbox();
};


    //       //slides

    //       let slideIndex = 1;
    //       showSlide(slideIndex);

    //       previous.addEventListener("click", changeSlide(-1));
    //       next.addEventListener("click", changeSlide(1));

    //       // Note that you are assigning new values here to our slidIndex.

    //       function changeSlide(n) {
    //         showSlide((slideIndex += n));
    //       }

    //       // This is your logic for the light box. It will decide which slide to show
    //       // and which dot is active.

    //       function showSlide(n) {
    //         const slides = document.getElementsByClassName("slide");

    //         console.log(slides.length)
    //         if (n > slides.length) {
    //           slideIndex = 1;
    //         }

    //         if (n < 1) {
    //           slideIndex = slides.length;
    //         }

    //         for (let i = 0; i < slides.length; i++) {
    //           slides[i].style.display = "none";
    //         }

    //         for (let i = 0; i < medias.length; i++) {
    //           medias[i].className = medias[i].className.replace(
    //             " active",
    //             ""
    //           );
    //         }

    //         slides[slideIndex - 1].style.display = "block";
    //         medias[slideIndex - 1].className += " active";
    //       }
    //   })
    // );
    // };



/**
 * Display photographers on html
 */

const galleryDisplay = (medias) => {
  medias.forEach((media) => {
    let factory = new MediaFactory(media);
    gallery.innerHTML += factory.createHtml();
    mediaLightboxFrame.innerHTML += factory.createMediaLightbox();
  });
};

const init = async () => {
  const { photographers, media } = await getData();
  photographerPage(photographers, media);
};

init();
