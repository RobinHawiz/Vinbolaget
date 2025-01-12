let body = document.body;
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
let isMobile = userDeviceIsMobile();
let scrollbarWidth = window.innerWidth - document.body.offsetWidth;
onresize = () => {
  scrollbarWidth = window.innerWidth - document.body.offsetWidth;
};

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
  // Use different styling, depending on whether or not the gallery contains more than one item.
  if (totImages + totVideos > 1) {
    galleryDisplayArea.classList.add("gallery-display-area");
  } else {
    galleryDisplayArea.classList.add("gallery-display-area-one-item");
  }

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
    // When the expanded gallery is hidden, we want to remain at the top of the scroll position
    window.scrollTo(0, scrollY);
    document.body.style.position = "";
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
  if (isMobile) {
    if (body.classList.contains("gallery-expanded-open")) {
      // When the expanded gallery is hidden, we want to remove the fixed position in order to be able to scroll again.
      body.style.position = "";
    } else {
      // When the expanded gallery is shown, we want a fixed body
      // This fixes the issue of being able to scroll on mobile when the expanded gallery is open (because setting overflow-y to hidden does not work).
      body.style.position = "fixed";
    }
  } else {
    if (body.classList.contains("gallery-expanded-open")) {
      document.body.style.overflowY = "";
      body.style.paddingRight = 0; // Prevents overlay shifts when the scrollbar reappears.
    } else {
      body.style.overflowY = "hidden";
      body.style.paddingRight = `${scrollbarWidth}px`; // Prevents overlay shifts when the scrollbar is hidden
    }
  }
  body.classList.toggle("gallery-expanded-open");
}

function userDeviceIsMobile() {
  let check = false;
  // Got this from http://detectmobilebrowsers.com/
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    ) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.operax);
  return check;
}
