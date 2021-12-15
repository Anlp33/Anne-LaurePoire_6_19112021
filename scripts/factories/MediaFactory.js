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
  }
  createHtml() {
    return `
      <article class="gallery_item">
        <div class="media">
          <img src="./assets/images/${this.photographerId}/${this.image}"/>
        </div>
       <div class="details">
            <h3>${this.title}</h3>
        <div class="like">
              <span class="numbers">${this.likes}</span>
              <span class="hearts" data-like="false">
                <i class="fas fa-heart" alt="coeur" aria-label="ajoute ou supprime le like au clic">
                </i>
              </span> 
        </div>
      </article>
        `;
  }
  createMediaLightbox() {
    return `<div class="media-lightbox hide">
      <img src="./assets/images/${this.photographerId}/${this.image}"/>
      <h3>${this.title}</h3>
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
  }
  createHtml() {
    return `<article class="gallery_item">
    <div class="media">
          <video src="./assets/images/${this.photographerId}/${this.video}" controls type="video/mp4"> </video>
    </div>
          <div class="details">
            <h3>${this.title}</h3>
            <div class="like">
              <span class="numbers">${this.likes}</span>
              <span class="hearts" data-like="false">
                <i class="fas fa-heart" alt="coeur" aria-label="ajoute ou supprime le like au clic">
                </i>
              </span></div>
        </article>
        `;
  }
  createMediaLightbox() {
    return `<div class="media-lightbox hide">
    <video src="./assets/images/${this.photographerId}/${this.video}" controls type="video/mp4"> </video>
       <h3>${this.title}</h3>
       </div>`;
  }
}
