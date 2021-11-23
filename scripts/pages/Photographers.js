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
  }

  createHtml() {
    return `<article class="card">
       <a href ="./photographer.html?id=${this.id}" >
         <div class="introduction">
            <img src="./assets/photographers/${this.portrait}">
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
       <div id="details">
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
            <button class="contact_button" onclick="displayModal()">
            Contactez-moi
            </button>
        </div>
        </div>
        <div id="photo">
          <img src="./assets/photographers/${this.portrait}">
        </div>
        </a>
      </article>
        `;
  }
}
