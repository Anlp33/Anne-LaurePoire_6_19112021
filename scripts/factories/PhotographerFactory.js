class PhotographerFactory {
  constructor(data) {
    if (data.type === "image") {
      return new Img(data);
    } else if (data.type === "video") {
      return new Video(data);
    } else {
      throw "Unknown type format";
    }
  
  }
}

class Img {
  constructor(data) {
    this.image = data.image;
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.tags = data.tags;
    this.date = data.date;
    this.price = data.price;
  }
  createHtml() {
    return `
      <article class="gallery_item">
          <img src="./assets/images/${this.photographerId}/${this.image}" />
          <div class="details">
            <h3>${this.title}</h3>
            <span class="like">${this.likes}<img src="./assets/icons/heart.png" /> </span>
          </div>
        </article>
        `;
  }
}

class Video {
  constructor(data) {
    this.video = data.video;
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.tags = data.tags;
    this.date = data.date;
    this.price = data.price;
  }
  createHtml() {
    return `<article class="gallery_item">
          <video controls> <source src="./assets/images/${this.photographerId}/${this.video}" type="video/mp4"> </video>
          <div class="details">
            <h3>${this.title}</h3>
            <span class="like">${this.likes}<img src="./assets/icons/heart.png" /> </span>
          </div>
        </article>
        `;
  }
}
