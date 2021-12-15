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

  const photographerName = document.getElementById("namePhotographer");
  photographerName.innerHTML = photographerModel.name;

  // display media corresponding to the photographer
  const mediaFilter = media.filter(
    (media) => media.photographerId == photographerPageID
  );
  galleryDisplay(mediaFilter);

  //Likes increment

  const likesIncrement = async () => {
    const likeBtn = document.querySelectorAll(".hearts");
    let numberOfLikes = document.querySelectorAll(".numbers");
    let totalLikes = document.getElementById("numberTotalLikes");

    likeBtn.forEach((button, index) => {
      button.addEventListener("click", function () {
        let clickedBtn = button.getAttribute("data-like");

        console.log(numberOfLikes);

        if (clickedBtn == "false") {
          mediaFilter[index].likes += 1;
          numberOfLikes[index].innerHTML = mediaFilter[index].likes;
          button.setAttribute("data-like", "true");
          totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
        } else {
          mediaFilter[index].likes -= 1;
          numberOfLikes[index].innerHTML = mediaFilter[index].likes;
          button.setAttribute("data-like", "false");
          totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1;
        }
      });
    });

    //sum total likes
    let num = 0;

    for (i = 0; i < numberOfLikes.length; i++) {
      num += parseInt(numberOfLikes[i].innerText);
    }
    totalLikes.innerHTML = num;
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

  const addEventLightbox = async () => {
    const mediaGallery = document.querySelectorAll(".media");
    const closeLightboxBtn = document.getElementById("closeLightbox");
    const mediaLightbox = document.querySelectorAll(".media-lightbox");
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");

    let index = 0;

    function openLightbox() {
      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      main.style.display = "none";
      header.style.display = "none";
      main.setAttribute("aria-hidden", "true");
      header.setAttribute("aria-hidden", "true");
    }
    function closeLightbox() {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      header.style.display = "block";
      main.style.display = "block";
      main.setAttribute("aria-hidden", "false");
      header.setAttribute("aria-hidden", "false");
      mediaLightbox[index].classList.toggle("hide");
    }

    mediaGallery.forEach((media) =>
      media.addEventListener("click", function (e) {
        //openModal with all the media from the photographer
        openLightbox();
        const clickedMedia = e.target.attributes.src.nodeValue;

        //show media that has been clicked
        for (let i = 0; i < mediaLightbox.length; i++) {
          const mediaSrc =
            mediaLightbox[i].childNodes[1].attributes.src.nodeValue;

          if (clickedMedia === mediaSrc) {
            mediaLightbox[i].classList.toggle("hide");
            index = i;
            console.log("index actuel=", index);
          }
        }
      })
    );

    next.addEventListener("click", function () {
      mediaLightbox[index].classList.toggle("hide");

      if (index == mediaLightbox.length - 1) {
        mediaLightbox[0].classList.toggle("hide");
        index = 0;
      } else {
        mediaLightbox[index + 1].classList.toggle("hide");
        index++;
      }
    });

    previous.addEventListener("click", function () {
      mediaLightbox[index].classList.toggle("hide");
      console.log(index);

      if (index <= 0) {
        console.log("ok");
        index = mediaLightbox.length - 1;
        mediaLightbox[index].classList.toggle("hide");
      } else {
        mediaLightbox[index - 1].classList.toggle("hide");
        index--;
      }
    });

    //keyboard event

    document.addEventListener("keyup", function (e) {

      if (e.key === "ArrowRight") {
        mediaLightbox[index].classList.toggle("hide");

        if (index == mediaLightbox.length - 1) {
          mediaLightbox[0].classList.toggle("hide");
          index = 0;
        } else {
          mediaLightbox[index + 1].classList.toggle("hide");
          index++;
        }
      } else if (e.key === "ArrowLeft") {
         mediaLightbox[index].classList.toggle("hide");
         console.log(index);

         if (index <= 0) {
           console.log("ok");
           index = mediaLightbox.length - 1;
           mediaLightbox[index].classList.toggle("hide");
         } else {
           mediaLightbox[index - 1].classList.toggle("hide");
           index--;
         }
      }
    });

    //close lightbox//
    closeLightboxBtn.addEventListener("click", closeLightbox);
  };

  addEventLightbox();
};

/**
 * Display photographers on html
 */

const galleryDisplay = async(medias) => {
  medias.forEach((media) => {
    let factory = new MediaFactory(media);
    gallery.innerHTML += factory.createHtml();
    mediaLightboxFrame.innerHTML += factory.createMediaLightbox();
  });
};

const init = async () => {
  const { photographers, media } = await getData();
  photographerPage(photographers, media);
  addEventModal();
};

init();
