class PhotographerFactory {
  constructor(data, type) {
    if (type === "image") {
      return new Img(data);
    } else if (type === "video") {return new Video(data);
     } else {
           throw 'Unknown type format'
       }
  }
}

class Img {
  constructor(data) {
    this.type = data.type;
    this.image = data.image;
    this.id = data.id;
    this.title = data.title;
    this.likes = data.likes;
  }
  createHtml() {
    return `<article class="gallery_item">
          <img src="./assets/images/${this.image}" />
          <div class="details">
            <h3>${this.title}</h3>
            <span class="like">${this.likes}<img src="./assets/icons/heart.png" /> </span>
          </div>
        </article>
        `;
  }
}

class Video { //extends image super(data)?
  constructor(data) {
    this.type = data.type;
    this.video = data.video;
    this.id = data.id;
    this.title = data.title;
    this.likes = data.likes;
  }
  createHTML() {
    return `<article class="gallery_item">
          <video controls> <source src="./assets/images/${this.video}" type="video/mp4"> </video>
          <div class="details">
            <h3>${this.title}</h3>
            <span class="like">${this.likes}<img src="./assets/icons/heart.png" /> </span>
          </div>
        </article>
        `;
  }
}
