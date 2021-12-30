//Global variables
const photographerIntro = document.getElementById("photographer_intro");
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const mediaLightboxFrame = document.getElementById("media-lightbox-frame");
const main = document.querySelector("main");
const header = document.querySelector("header");

/**
 * Get JSON data with Fetch
 */

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

  //display photographer name in Contact modal
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

      //Keyboard event on enter
      button.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
          let clickedBtn = button.getAttribute("data-like");

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
   *sort media on event select
   */

  const addEventSort = async () => {
    const selectFilter = document.querySelectorAll(".filter-select");

    let arrayFilter = [];

    selectFilter.forEach((filter) =>
      filter.addEventListener("change", async function (e) {
        switch (e.target.value) {
          case "likes":
            arrayFilter = mediaFilter.sort((a, b) => {
              return b.likes - a.likes;
            });
            break;

          case "title":
            arrayFilter = mediaFilter.sort((a, b) => {
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
            break;

          case "date":
            arrayFilter = mediaFilter.sort((a, b) => {
              let da = new Date(a.date);
              let db = new Date(b.date);
              return db - da;
            });
            break;
        }
        gallery.innerHTML = "";
        mediaLightboxFrame.innerHTML = "";
        galleryDisplay(arrayFilter);
        likesIncrement();
        addEventLightbox();
      })
    );
  };
  addEventSort();

  /**
   * Display Lightbox on event Click or Keyboard pressed
   */

  const addEventLightbox = async () => {
    const mediaGallery = document.querySelectorAll(".media");
    const closeLightboxBtn = document.getElementById("closeLightbox");
    const mediaLightbox = document.querySelectorAll(".media-lightbox");
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");
    console.log("fonction");
    console.log(next);

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

    function goToNext() {
      mediaLightbox[index].classList.toggle("hide");

      if (index == mediaLightbox.length - 1) {
        mediaLightbox[0].classList.toggle("hide");
        index = 0;
      } else {
        mediaLightbox[index + 1].classList.toggle("hide");
        index++;
      }
    }
    function goToPrevious() {
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

    function startLightbox(e) {
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
    }

    mediaGallery.forEach((media) =>
      media.addEventListener("click", function (e) {
        startLightbox(e);
        media.addEventListener();
      })
    );

    next.addEventListener("click", goToNext);

    previous.addEventListener("click", goToPrevious);

    //keyboard events

    document.addEventListener("keyup", function (e) {
      if (e.key === "ArrowRight") {
        goToNext();
      }
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    });

    mediaGallery.forEach((media) =>
      media.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
          console.log("key");
          startLightbox(e);
        }
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

const galleryDisplay = async (medias) => {
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
