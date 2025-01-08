let path = window.location.pathname;
let productName = path.split("/").pop().slice(0, -5);

let body = document.querySelector("body");
let galleryItems = document.querySelectorAll(".gallery-item");
let galleryItemsImages = document.querySelectorAll(".gallery-item img");
let galleryItemsVideos = document.querySelectorAll(".gallery-item video");
let galleryButtons = document.querySelectorAll(
  `button[data-gallery-item*="item"]`
);

galleryItemsImages.forEach((img) => {
  img.addEventListener("click", expandGallery);
});

// When a video has finished playing, set the time to 0:00 and pause it.
galleryItemsVideos.forEach((video) => {
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    video.pause();
  });
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", showGalleryItem);
});

function expandGallery() {
  let galleryExpanded = document.createElement("div");
  galleryExpanded.classList.add("gallery-expanded");

  let galleryBackground = document.createElement("div");
  galleryBackground.classList.add("gallery-background");

  let galleryDisplayArea = document.createElement("div");
  galleryDisplayArea.classList.add("gallery-display-area");

  let galleryLeftArrowBtn = document.createElement("button");
  let galleryLeftArrowImg = document.createElement("img");
  galleryLeftArrowImg.src = "../../icon/iconmonstr-left-arrow-circle.svg";

  let galleryRightArrowBtn = document.createElement("button");
  let galleryRightArrowImg = document.createElement("img");
  galleryRightArrowImg.src = "../../icon/iconmonstr-right-arrow-circle.svg";

  // !! Experimental only !!
  // Edit new images and add product video here.
  let galleryPictureElem = document.createElement("picture");
  let galleryImg = document.createElement("img");
  galleryImg.src = `../../img/products/product-page/${productName}/${productName}-product-page@1x.png`;
  // This capitalizes the first letter.
  galleryImg.alt = `Vinflaskan ${
    String(productName).charAt(0).toUpperCase() + String(productName).slice(1)
  }`;

  galleryBackground.addEventListener("click", () => {
    galleryExpanded.remove();
  });

  galleryPictureElem.appendChild(galleryImg);

  galleryLeftArrowBtn.appendChild(galleryLeftArrowImg);
  galleryRightArrowBtn.appendChild(galleryRightArrowImg);

  galleryDisplayArea.appendChild(galleryLeftArrowBtn);
  galleryDisplayArea.appendChild(galleryPictureElem);
  galleryDisplayArea.appendChild(galleryRightArrowBtn);

  galleryExpanded.appendChild(galleryBackground);
  galleryExpanded.appendChild(galleryDisplayArea);

  body.insertBefore(galleryExpanded, body.firstChild);
}

function showGalleryItem() {
  // We only want the integer from the data attribute.
  let itemNumber = Number(this.dataset.galleryItem.match(/\d+/));
  // This is the gallery item that has been selected to be shown by the button that was clicked.
  let selectedGalleryItem = galleryItems[itemNumber - 1];
  // If the selected gallery item is not shown then we'll show it. But if it's already shown then we skip the if-statement and do nothing.
  if (selectedGalleryItem.classList.contains("hidden")) {
    toggleGalleryItems(selectedGalleryItem);
  }
}

function toggleGalleryItems(selectedGalleryItem) {
  // Hide the previously shown gallery item.
  let prevGalleryItem = document.querySelector(".active");
  prevGalleryItem.classList.toggle("active");
  prevGalleryItem.classList.toggle("hidden");
  // Show the selected gallery item.
  selectedGalleryItem.classList.toggle("active");
  selectedGalleryItem.classList.toggle("hidden");
}
