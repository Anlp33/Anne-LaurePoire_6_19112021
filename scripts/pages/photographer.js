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

// function toggle(x) {
//   let element = document.getElementsById(x);
//   if (element.style.display === "none") {
//     element.style.display = "block";
//   } else {
//     element.style.display = "none";
//   }
// }

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

  //Likes increment

  const likesIncrement = async () => {
    const likeBtn = document.querySelectorAll(".hearts");
    let numberOfLikesHtml = document.querySelectorAll(".numbers");

    likeBtn.forEach((button, index) => {
      button.addEventListener("click", function () {
        mediaFilter[index].likes += 1;
        numberOfLikesHtml[index].innerHTML = mediaFilter[index].likes;
      });
    });
  };

  likesIncrement();

  /**
   *sort media
   */

  const addEventSort = async () => {
    const selectFilter = document.querySelectorAll(".filter-select");
    //

    selectFilter.forEach((filter) =>
      filter.addEventListener("change", async function (e) {
        switch (e.target.value) {
          case "likes":
            const popularityFilter = mediaFilter.sort((a, b) => {
              return b.likes - a.likes;
            });
            gallery.innerHTML = "";
            lightbox.innerHTML = "";
            galleryDisplay(popularityFilter);
            likesIncrement();
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
            likesIncrement();
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
            likesIncrement();
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

  const addEventLightbox = async() => {
    const mediaGallery = document.querySelectorAll(".media");
    const closeLightboxBtn = document.getElementById("closeLightbox");
    const mediaLightbox = document.querySelectorAll(".media-lightbox");
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
        //openModal with all the media from the photographer
        openLightbox();

        //show media that has been clicked
        mediaLightbox.forEach((media) => {
          const clickedMedia = e.target.attributes.src.nodeValue;
          const mediaSrc = media.childNodes[1].attributes.src.nodeValue;


          if (clickedMedia === mediaSrc) {
            media.style.display = "block";
            console.log(media.nextElementSibling)
          } else media.style.display = "none";

          next.addEventListener("click", function (e) {
           // display next media and hide current one
            if (clickedMedia === mediaSrc) {
              media.style.display = "none";
              media.nextElementSibling.style.display = "block";
            } 
          })

          previous.addEventListener("click", function () {
              if (clickedMedia === mediaSrc) {
                media.style.display = "none";
                media.previousElementSibling.style.display = "block";
              } 
          })

        });
      })
    );

    //close lightbox//
    closeLightboxBtn.addEventListener("click", closeLightbox);

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
    mediaLightboxFrame.innerHTML += factory.createMediaLightbox();
  });
};

const init = async () => {
  const { photographers, media } = await getData();
  photographerPage(photographers, media);
};

init();
