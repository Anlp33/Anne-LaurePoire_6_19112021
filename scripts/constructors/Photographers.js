class Photographers {
  constructor(data) {
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.portrait = data.portrait;
    this.price = data.price;
    this.tags = data.tags;
    this.id = data.id;
    this.alt = data.alt;
  }

  createHtml() {
    return `<article class="card">
       <a href ="./photographer.html?id=${this.id}" >
         <div class="introduction">
            <img src="./assets/photographers/${this.portrait}" alt="${this.alt}">
             <h2>${this.name}</h2>
            <span class="location">${this.city + ", " + this.country}</span>
            <span class="slogan">${this.tagline}</span>
            <span class="rate">${this.price}</span>
          </div>

          <div class="filter">${this.tags
            .map(
              (tag) =>
                `<ul><li><a href="#" class="tags"><span aria-hidden="true">#</span>${tag}</a></li></ul>`
            )
            .join("")}</div>
        </a>
      </article>
        `;
  }

  createHtmlPhotographerPage() {
    return `<article class="card">
       <a href ="./photographer.html?id=${this.id}" >
       <div id="photographer-details">
       <div id="info">
          <div id="introduction">
             <h1>${this.name}</h1>
            <span class="location">${this.city + ", " + this.country}</span>
            <span class="slogan">${this.tagline}</span>
          </div>
               
          <div class="filter">${this.tags
            .map(
              (tag) =>
                `<ul><li><a href="#" class="tags"><span aria-hidden="true">#</span>${tag}</a></li></ul>`
            )
            .join("")}
            </div>
        </div>    
        
        <div class="button">
            <button id="contact_button" tabindex="2">
            Contactez-moi
            </button>
        </div>

        </div>
        <div id="photo">
          <img src="./assets/photographers/${this.portrait}" alt="${
      this.alt
    }" tabindex="3">
        </div>
        </a>
      </article>
       <div id="total_likes" tabindex="6">
       <div id="numberTotalLikes" aria-labelledby="nombre total de like"></div>
        <i
          class="fas fa-heart"
          alt="coeur"
          aria-label="ajoute ou supprime le like au clic"
        ></i>
      <div id="price">${this.price} €/jour</div>
      </div>
        `;
  }
}
