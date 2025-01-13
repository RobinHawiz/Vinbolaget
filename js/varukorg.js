let button = document.querySelector("button[type=submit]");
let form = document.querySelector("#delivery");

button.addEventListener("click", (e) => {
  if (form.checkValidity()) {
    alert(
      "Din beställning har godkänts och en bekräftelse har skickats till din e-post. Välkommen åter!"
    );
  }
});
