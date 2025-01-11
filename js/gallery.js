let body = document.querySelector("body");
let galleryItems = document.querySelectorAll(".gallery-item");
let galleryItemsImages = document.querySelectorAll(".gallery-item img");
let galleryItemsVideos = document.querySelectorAll(".gallery-item video");
let galleryButtons = document.querySelectorAll(
  `button[data-gallery-item*="item"]`
);

let path = window.location.pathname;
let productName = path.split("/").pop();
let totImages = galleryItemsImages.length;
let totVideos = galleryItemsVideos.length;

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
  galleryLeftArrowBtn.classList.add("arrow-left");
  galleryLeftArrowImg.src = "../../icon/iconmonstr-left-arrow-circle.svg";

  let galleryRightArrowBtn = document.createElement("button");
  let galleryRightArrowImg = document.createElement("img");
  galleryRightArrowBtn.classList.add("arrow-right");
  galleryRightArrowImg.src = "../../icon/iconmonstr-right-arrow-circle.svg";

  let galleryCloseBtn = document.createElement("button");
  let galleryXMarkCircleImg = document.createElement("img");
  galleryXMarkCircleImg.src = "../../icon/iconmonstr-x-mark-circle.svg";
  galleryCloseBtn.classList.add("close");

  // Display all expanded versions of the product images that are shown inside the regular gallery.
  for (i = 1; i <= totImages; i++) {
    let galleryImgWrapper = document.createElement("div");
    galleryImgWrapper.classList.add("img-wrapper");
    galleryImgWrapper.classList.add("gallery-item");
    // Hide all other images except the first one because we want to show the first image when the gallery is expanded, regardless of which image the user clicks.
    // An improvement would be to show the clicked image first instead. But I might add that feature in a future update.
    i != 1
      ? galleryImgWrapper.classList.add("hidden")
      : galleryImgWrapper.classList.add("active");

    let galleryPictureElem = document.createElement("picture");

    let galleryImg = document.createElement("img");
    galleryImg.src = `../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@1x.png`;
    // The string interpolation capitalizes the first letter in the product name.
    galleryImg.alt = `Vinflaskan ${
      productName.charAt(0).toUpperCase() + productName.slice(1)
    }`;

    let gallerySourcePng = document.createElement("source");
    gallerySourcePng.type = `image/png`;
    gallerySourcePng.srcset = `../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@1x.png 1x,
    ../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@2x.png 2x,
    ../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@3x.png 3x`;

    let gallerySourceWebp = document.createElement("source");
    gallerySourceWebp.type = `image/webp`;
    gallerySourceWebp.srcset = `../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@1x.webp 1x,
    ../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@2x.webp 2x,
    ../../img/products/product-page/${productName}/${productName}-product-page-expanded-nr${i}@3x.webp 3x`;

    galleryPictureElem.appendChild(gallerySourceWebp);
    galleryPictureElem.appendChild(gallerySourcePng);
    galleryPictureElem.appendChild(galleryImg);
    galleryImgWrapper.appendChild(galleryPictureElem);
    galleryDisplayArea.appendChild(galleryImgWrapper);
  }

  // Display all videos that are shown on the product page.
  for (i = 1; i <= totVideos; i++) {
    let galleryVideoWrapper = document.createElement("div");
    galleryVideoWrapper.classList.add("video-wrapper");
    galleryVideoWrapper.classList.add("gallery-item");
    galleryVideoWrapper.classList.add("hidden");

    let galleryVideo = document.createElement("video");
    galleryVideo.setAttribute("controls", "");

    let gallerySourceMp4 = document.createElement("source");
    gallerySourceMp4.type = `video/mp4`;
    gallerySourceMp4.src = `../../video/${productName}/${productName}-video-nr${i}@h264.mp4`;

    let gallerySourceWebm = document.createElement("source");
    gallerySourceWebm.type = `video/webm`;
    gallerySourceWebm.src = `../../video/${productName}/${productName}-video-nr${i}@vp9.webm`;

    galleryVideo.appendChild(gallerySourceWebm);
    galleryVideo.appendChild(gallerySourceMp4);
    galleryVideoWrapper.appendChild(galleryVideo);
    galleryDisplayArea.appendChild(galleryVideoWrapper);
  }

  galleryLeftArrowBtn.appendChild(galleryLeftArrowImg);
  galleryRightArrowBtn.appendChild(galleryRightArrowImg);

  // If the amount of items that can be displayed are more than one, then add the arrow buttons to the expanded gallery.
  if (galleryItems.length > 1) {
    galleryDisplayArea.insertBefore(
      galleryLeftArrowBtn,
      galleryDisplayArea.firstChild
    );
    galleryDisplayArea.appendChild(galleryRightArrowBtn);
  }

  galleryCloseBtn.appendChild(galleryXMarkCircleImg);
  galleryDisplayArea.appendChild(galleryCloseBtn);

  galleryExpanded.appendChild(galleryBackground);
  galleryExpanded.appendChild(galleryDisplayArea);

  body.insertBefore(galleryExpanded, body.firstChild);

  let galleryExpandedItems = document.querySelectorAll(
    ".gallery-display-area .gallery-item"
  );

  galleryLeftArrowBtn.addEventListener("click", () => {
    for (i = 0; i < galleryExpandedItems.length; i++) {
      galleryExpandedItems[i].classList.contains("active");
      if (i == 0) {
        galleryExpandedItems[i].classList.toggle("active");
        galleryExpandedItems[i].classList.toggle("hidden");
        galleryExpandedItems[galleryExpandedItems.length - 1].classList.toggle(
          "active"
        );
        galleryExpandedItems[galleryExpandedItems.length - 1].classList.toggle(
          "hidden"
        );
        break;
      } else {
        galleryExpandedItems[i].classList.toggle("active");
        galleryExpandedItems[i].classList.toggle("hidden");
        galleryExpandedItems[i - 1].classList.toggle("active");
        galleryExpandedItems[i - 1].classList.toggle("hidden");
        break;
      }
    }
  });

  galleryRightArrowBtn.addEventListener("click", () => {
    for (i = 0; i < galleryExpandedItems.length; i++) {
      galleryExpandedItems[i].classList.contains("active");
      if (i == galleryExpandedItems.length - 1) {
        galleryExpandedItems[i].classList.toggle("active");
        galleryExpandedItems[i].classList.toggle("hidden");
        galleryExpandedItems[0].classList.toggle("active");
        galleryExpandedItems[0].classList.toggle("hidden");
        break;
      } else {
        galleryExpandedItems[i].classList.toggle("active");
        galleryExpandedItems[i].classList.toggle("hidden");
        galleryExpandedItems[i + 1].classList.toggle("active");
        galleryExpandedItems[i + 1].classList.toggle("hidden");
        break;
      }
    }
  });

  galleryBackground.addEventListener("click", () => {
    // We remove the expanded gallery when the user clicks outside of the gallery display area.
    galleryExpanded.remove();
    // Adds back the ability to scroll
    toggleScrolling();
  });

  galleryCloseBtn.addEventListener("click", () => {
    // We remove the expanded gallery when the user clicks on the close button.
    galleryExpanded.remove();
    // Adds back the ability to scroll
    toggleScrolling();
  });

  // Removes the ability to scroll
  toggleScrolling();
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

function toggleScrolling() {
  body.classList.toggle("gallery-expanded-open");
}
