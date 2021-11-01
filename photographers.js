/**
 * Get JSON data with Fetch
 */

let userData = [];
const getData = async() => {
   await fetch("FishEyeData.json")
        .then((res) => res.json())
        .then((data) => (userData = data.photographers));
};

/**
 * Display photographers on html
 */

const userCard = document.getElementById("profiles");

const userDisplay = async() => {
    await getData();

    userCard.innerHTML = userData
      .map(
        (user) =>
          `
        <article class="card">
         <div class="introduction">
            <div class="photo"><img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${
              user.portrait
            }"</div>
             <h2>${user.name}</h2>
        </div>
          <div class="paragraph">
            <span class="location">${user.city + ", " + user.country}</span>
            <span class="slogan">${user.tagline}</span>
            <span class="rate">${user.price}</span>
          </div>
          <span class="filter">
            <li><a href="#">${user.tags}</a></li>
          </span>
        </article>
        `
      )
      .join("");
}

userDisplay();

