// /**
//  * Get JSON data with Fetch
//  */
// const gallery = document.getElementById("gallery");

// const getData = async () => {
//   return await fetch("./data/FishEyeData.json").then((res) => res.json());
// };

// /**
//  * Get photographer ID in URL
//  */




// /**
//  * Find which photographer to display
//  */

// const getPhotographerID = async (photographerArray) => {
//   const urlID = window.location.search; //?id=930
//   alert(urlID);

//       const photographersFilter = photographerArray.filter((photographer) =>
//         photographer.urlID.includes(930)
//   );
//   console.log(photographersFilter);
// };


// /**
//  * Display photographers on html
//  */


// // const galleryDisplay = (medias) => {
// //   medias.forEach((media) => {
// //     let factory = new PhotographerFactory(media, 'image');//donnée fichier json
// //     gallery.innerHTML += factory.createHtml(media);
// //   });
// // };

// const init = async () => {
//   const { media } = await getData();
//   console.log(media);
//   getPhotographerID(media);
//   // galleryDisplay(media);
// };

// init();
