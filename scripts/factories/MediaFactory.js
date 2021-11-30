class MediaFactory {
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
        <div class="media">
          <img src="./assets/images/${this.photographerId}/${this.image}"/>
        </div>
       <div class="details">
            <h3>${this.title}</h3>
            <span class="like">${this.likes}<img src="./assets/icons/heart.png" /> </span>
        </div>
      </article>
        `;
  }
  createMediaLightbox() {
    return `
    <div id="media-lightbox">
      <img src="./assets/images/${this.photographerId}/${this.image}"/>
      <h3>${this.title}</h3>
      <span class="hidden">${this.likes}</span>
      <span class="hidden">${this.date}</span>
      <span class="hidden">${this.id}</span>
    </div>`;
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
    <div class="media">
          <video controls> <source src="./assets/images/${this.photographerId}/${this.video}" type="video/mp4"> </video>
    </div>
          <div class="details">
            <h3>${this.title}</h3>
            <span class="like">${this.likes}<img src="./assets/icons/heart.png" /> </span>
          </div>
        </article>
        `;
  }
  createMediaLightbox() {
    return `
    <div id="media-lightbox">
       <video controls> <source src="./assets/images/${this.photographerId}/${this.video}" type="video/mp4"> </video>
      <h3>${this.title}</h3>
    </div>`;
  }
}
