/*
 * Kod för webbshop, av Mattias Dahlgren, MIUN.
 * E-post: mattias.dahlgren@miun.se
 * OBS: Denna kod får ej användas utanför projektuppgifter för Mittuniversitetets Webbutvecklings-program.
 * Denna information måste lämnas oförändrad.
 * Har du gjort ändringar i denna fil ska detta beskrivas här i sidhuvudet.
 *
 * Ändringar gjorda:
 * I funktionen addToBasket så tog jag bort numOfItems och la till den som en parameter istället, vilket representerar antalet varor som lades till när köpknappen tryckts.
 *
 * Ändrade parametern image till imageName då vi enbart behöver namnet på bilden och inte själva länken. Du kan se varför i funktionen showCheckout.
 *
 * I for-loopen så ändrade jag numOfItems = currentBasket[i].nums + 1; till numOfItems = currentBasket[i].nums + parseInt(numOfItems);
 *  Detta eftersom att programmet uppfattade numOfItems som en sträng och konkatinerade värdena, istället för att addera dem som integers/numbers.
 * så 2 + 3 blev 23 istället för 5.
 * Jag la parseInt(numOfItems) i objektet currentBasket för att förhindra problemet som jag talade om tidigare.
 *
 * Tog bort funktionen showSmallBasket då jag inte behövde den.
 *
 * Ändrade funktionen showBasket rejält. Nu visar den bara antalet tillagda varor bredvid länken Varukorg i navigationen.
 *
 * Ändrade funktionen checkoutBasket en del.
 */

const basketEl = document.getElementById("basket"); // Varukorgen i DOM
const smallBasketEl = document.getElementById("small-basket"); // Liten varukorg med endast antal och summa
const checkoutEl = document.getElementById("checkout"); // Kassan
const checkoutInlineEl = document.getElementsByClassName("checkout-inline"); // Checka-ut-inline (array)
const checkoutButtonEl = document.getElementsByClassName("checkout-button"); // Checka-ut-knappar (array)
const itemsInBasketEl = document.getElementsByClassName("items-in-basket"); // Antal varor i varukorgen
const totalSumEl = document.getElementsByClassName("total-sum"); // Total-summa
const notifyEl = document.getElementById("notify"); // Meddelande-element då vara lagts i varukorgen

let totSummaOchVaror = document.querySelector(".total");

window.addEventListener("load", showBasket, false); // Visa varukorg vid start
window.addEventListener("load", showCheckout, false); // Gå till betalning/utcheckning

/* Lägg till i varukorg */
function addToBasket(
  el,
  id,
  name,
  numOfItems,
  cost,
  imageName,
  notify = false
) {
  // Sätt en klass på anropande class
  el.classList.add("clicked");

  // Läs in listan
  let currentBasket = JSON.parse(localStorage.getItem("basket"));

  if (currentBasket == null) {
    currentBasket = [];
  }

  // Kontrollera om varan redan finns
  for (let i = 0; i < currentBasket.length; i++) {
    if (id == currentBasket[i].artId) {
      numOfItems = currentBasket[i].nums + parseInt(numOfItems);
      currentBasket.splice(i, 1);
    }
  }

  // Lägg till
  currentBasket.push({
    artId: id,
    artName: name,
    artCost: cost,
    artImage: imageName,
    nums: parseInt(numOfItems),
  });

  // Konvertera till JSON
  let jsonStr = JSON.stringify(currentBasket);
  // Lagra
  localStorage.setItem("basket", jsonStr);

  // Meddela användare, om notify = true
  if (notify == true) {
    alert(`Varan: ${name} lagd i varukorgen`);
  }
  showBasket();
  showCheckout();
}

/* Visa varukorg */
function showBasket() {
  // Läs in varukorg
  let basketItems = JSON.parse(localStorage.getItem("basket"));
  if (basketItems == null) {
    basketItems = [];
  }
  let numOfItems = 0;
  // Utskrift av totalsumma och antal
  if (basketItems.length > 0) {
    // Loopa genom varor
    for (let i = 0; i < basketItems.length; i++) {
      // Flera varor av samma typ - addera kostnaden * antal
      if (basketItems[i].nums > 1) {
        let count = parseInt(basketItems[i].nums);
        for (let j = 0; j < count; j++) {
          numOfItems++;
        }
      } else {
        numOfItems++;
      }
    }

    if (document.getElementById("basket")) {
      // Nollställ
      basketEl.innerHTML = "";

      if (basketItems.length > 0) {
        let numOfItems = 0;

        // Loopa genom varor
        for (let i = 0; i < basketItems.length; i++) {
          // Summera antalet sammanlagda varor
          if (basketItems[i].nums > 1) {
            let count = basketItems[i].nums;
            for (let j = 0; j < count; j++) {
              numOfItems++;
            }
          } else {
            numOfItems++;
          }

          // Skapa nytt element
          let newItem = document.createElement("div");
          newItem.style.position = "absolute";
          newItem.style.top = "-40%";
          newItem.style.right = "-20%";
          newItem.style.fontSize = "1.1rem";
          newItem.style.color = "#ffffff";
          newItem.style.backgroundColor = "rgb(157, 42, 55)";
          newItem.style.borderRadius = "50%";
          newItem.style.padding = "0.4rem 0.8rem";

          // Antal
          let newItemCount = document.createElement("span");
          newItemCount.className = "item-count";
          let newItemCountText = document.createTextNode(numOfItems);
          newItemCount.appendChild(newItemCountText);
          newItem.appendChild(newItemCount);

          // Lägg till i DOM
          basketEl.appendChild(newItem);
        }
      } else {
        // Tomt i listan
        basket.innerHTML = "";
      }
    }
  }
}

function showCheckout() {
  if (document.getElementById("checkout")) {
    let basketItems = JSON.parse(localStorage.getItem("basket"));
    if (basketItems == null) {
      basketItems = [];
    }

    // Nollställ
    checkoutEl.innerHTML = "";

    if (basketItems.length > 0) {
      // Räkna ut totalsumma
      let sum = 0;
      // Räknar ut totala antalet varor
      let totItems = 0;

      // Loopa genom varor
      for (let i = 0; i < basketItems.length; i++) {
        // Räkna ut kostnad och lägg till summa
        let itemCost = parseInt(basketItems[i].artCost);
        let itemSumCost = 0;

        // Flera varor av samma typ - addera kostnaden * antal
        if (basketItems[i].nums > 1) {
          let count = parseInt(basketItems[i].nums);
          for (let j = 0; j < count; j++) {
            totItems++;
            sum += itemCost;
            itemSumCost += itemCost;
          }
        } else {
          totItems++;
          sum += itemCost;
          itemSumCost = itemCost;
        }

        var artId = basketItems[i].artId;
        var artName = basketItems[i].artName;
        var numItems = basketItems[i].nums;
        var artImage = basketItems[i].artImage;

        // Skapa nytt element

        checkoutEl.innerHTML += `          <article>
            <div class="product-name-and-img">
              <picture>
                <source
                  type="image/webp"
                  media="(max-width: 665px)"
                  srcset=
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page-mobile@1x.webp 1x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page-mobile@2x.webp 2x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page-mobile@3x.webp 3x
                  "
                />
                <source
                  type="image/png"
                  media="(max-width: 665px)"
                  srcset="
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page-mobile@1x.png 1x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page-mobile@2x.png 2x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page-mobile@3x.png 3x
                  "
                />
                <source
                  type="image/webp"
                  srcset="
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@1x.webp 1x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@2x.webp 2x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@3x.webp 3x
                  "
                />
                <source
                  type="image/png"
                  srcset="
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@1x.png 1x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@2x.png 2x,
                    ../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@3x.png 3x
                  "
                />
                <img
                  src="../img/products/shopping-cart-page/${artImage}/${artImage}-shopping-cart-page@1x.png"
                  alt="Vinflaskan ${(
                    artImage.charAt(0).toUpperCase() + artImage.slice(1)
                  ).replace("-", " ")}"
                  loading="lazy"
                />
              </picture>
              <h3 class="product-name">${artName}</h3>
            </div>
            <p class="quantity">${numItems}st</p>
            <p class="price">${itemSumCost}:-</p>
          </article>`;
      }
      totSummaOchVaror.innerHTML = `
          <p class="total-quantity">Totalt (${totItems} varor)</p>
          <p class="total-price">${sum}:-</p>
      `;
    } else {
      // Tomt i listan
      checkoutEl.innerHTML = `<p style="font-size: 2rem; padding-top: 5rem;">Varukorgen är tom</p>`;
      totSummaOchVaror.innerHTML += ``;
    }
  }
}

/* Till kassan */
function checkoutBasket(e) {
  let basketItems = JSON.parse(localStorage.getItem("basket"));
  let form = document.querySelector("#delivery");
  if (basketItems != null) {
    let itemCount = 0;
    let totalSum = 0;

    for (let i = 0; i < basketItems.length; i++) {
      let count = parseInt(basketItems[i].nums);
      for (let j = 0; j < count; j++) {
        totalSum += parseInt(basketItems[i].artCost);
        itemCount++;
      }
    }

    if (form.checkValidity()) {
      if (itemCount > 0) {
        alert(
          "Din order är mottagen och en bekräftelse har skickats till din e-post. Välkommen åter!"
        );
        // Tom varukorgen
        emptyBasket(false);
      } else {
        alert("Inga varor i din varukorg!");
      }
    }
  } else if (form.checkValidity()) {
    e.preventDefault();
    alert("Inga varor i din varukorg!");
  }
}

/* Töm varukorg */
function emptyBasket(conf = true) {
  if (conf == true) {
    if (confirm("Är du säker att du vill radera alla varor?")) {
      localStorage.removeItem("basket");
      showBasket();
      showCheckout();
    } else {
      return;
    }
  } else {
    console.log("e");
    localStorage.removeItem("basket");
    showBasket();
    showCheckout();
  }
}
