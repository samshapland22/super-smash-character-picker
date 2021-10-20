//<-------------------------FETCH DATA----------------------------->
fetch(
  "https://secret-ocean-49799.herokuapp.com/http://smashlounge.com/api/chars/all"
)
  .then((res) => res.json())
  .then((characters) => {
    console.log("character list", characters); //let's see what data we received from the API by using console.log

    //<---------POPULATE DROPDOWN WITH DATA FROM API--------------->

    let dropdown = document.querySelector("select");

    for (let character of characters) {
      let option = document.createElement("option");
      option.value = character.name;
      option.textContent = character.name;
      dropdown.append(option);
    }

    //<------------DISPLAY INFO FOR SELECTED CHARACTER----------------->
    let name = document.querySelector("#character-name");
    let weightRank = document.querySelector("#weight-ranking");
    let description = document.querySelector("#description");
    const label = document.querySelector("label");

    let selectedCharacter;

    dropdown.addEventListener("change", (e) => {
      selectedCharacter = characters.find(
        (char) => char.name === e.target.value
      );
      name.textContent = `Name: ${selectedCharacter.name}`;
      weightRank.textContent = `Weight Ranking: ${selectedCharacter.weight}`;
      description.textContent = selectedCharacter.guide;
      label.innerHTML = `Leave a review for <strong>${selectedCharacter.name}</strong>`;
    });

    //<-----------LEAVE A REVIEW FOR SELECTED CHARACTER-------------------->

    const reviewForm = document.querySelector("form");
    const ul = document.querySelector("ul");

    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newReview = document.createElement("li");
      const characterName = document.createElement("strong");
      newReview.textContent = e.target.review.value;
      characterName.textContent = `${selectedCharacter.name}: `;
      newReview.prepend(characterName);
      ul.append(newReview);
      reviewForm.reset();
    });
  });
