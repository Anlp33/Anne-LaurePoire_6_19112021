class Photographer {
  constructor(data) {
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.portrait = data.portrait;
    this.price = data.price;
    this.tags = data.tags;
  }

  createHtml() {
    let tagMap = this.tags.map((tag) => `<li><a href="#">${tag}</a></li>`);

    return `
        <article class="card">
         <div class="introduction">
            <div class="photo"><img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${
              this.portrait
            }"</div>
             <h2>${this.name}</h2>
        </div>
          <div class="paragraph">
            <span class="location">${this.city + ", " + this.country}</span>
            <span class="slogan">${this.tagline}</span>
            <span class="rate">${this.price}</span>
            <span class="filter">
            ${tagMap.join("")}
            </span>
          </div>

        </article>
        `;
  }
}
