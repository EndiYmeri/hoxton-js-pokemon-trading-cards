// Instructions
// - Use this template as the starting point => https://codesandbox.io/s/pokemon-trading-cards-template-s61u1?file=/src/index.js
// - Make sure you check and understand the data that is given to you! 
// - Create a card using JS that represents a single pokemon, use the example image as a reference. You will also find an HTML example in the templates folder
// - Use the exact CSS classes you see in the example HTML to obtain the same style for each card
// - The cards should be nested inside <ul class="cards"></ul>
// - Use the official-artwork object key as the images for the card. The images are all inside of the sprites key, in each pokemon object
// - Render all the cards on the page that represents all the pokemons, recreating the same layout, using JS

// Tips
// - Use functions to your advantage. Break each card into smaller parts, and think how you can turn them into functions.
// - Once you've got a card, think of a way to programmatically create all the others
// - Make sure you understand well the data structure before starting to create the cards

// Challenge
// Add an extra section to each card that contains information about which games each pokemon appeared in.

// Challenge 2
// See if you can find a way to toggle between the different images of each card! (this is a hard one! You might want to use google...)


function createTitle(pokemon) {
    const cardTitleEl = document.createElement('h2')

    cardTitleEl.setAttribute("class", "card--title")
    cardTitleEl.textContent = pokemon.name

    return cardTitleEl
}

function getSpritesValues(object) {

    let unfilteredImages = Object.values(object)
    let filteredImages = unfilteredImages.filter((element) => {
        if (element) {
            if (typeof(element) === "string") {
                return element
            }
        }
    })
    return filteredImages
}

function createImg(pokemon) {
    const imgEl = document.createElement("img")

    let filteredImages = getSpritesValues(pokemon.sprites)

    imgEl.setAttribute("width", "246")
    imgEl.setAttribute("class", "card--img")
    imgEl.setAttribute("src", pokemon.sprites.front_default)

    // Changing pokemon image on click
    let counter = 0
    imgEl.addEventListener('click', () => {
        console.log(counter)
        if (counter < filteredImages.length) {
            imgEl.setAttribute("src", filteredImages[counter])
            counter++
        } else {
            counter = 0;
        }
    })

    return imgEl
}

function createStats(pokemon, index) {

    let pokemonStats = []

    let statsNeeded = []

    for (stat in pokemon.stats) {
        pokemonStats.push(document.createElement("li"))

        statsNeeded.push(`${pokemon.stats[stat].stat.name}: ${pokemon.stats[stat].base_stat}`)
        pokemonStats[stat].textContent = statsNeeded[stat]
    }
    return pokemonStats[index]
}

function createCardText(pokemon) {
    const cardTextEl = document.createElement("ul")

    cardTextEl.setAttribute("class", "card--text")

    for (stat in pokemon.stats) {
        cardTextEl.append(createStats(pokemon, stat))
    }
    return cardTextEl
}


function createCard(pokemon) {
    const cards = document.querySelector(".cards")
    const cardEl = document.createElement("li")
    const cardEl2 = document.createElement("li")

    cardEl.setAttribute("class", "card")

    cards.append(cardEl)
    cardEl.append(createTitle(pokemon))
    cardEl.append(createImg(pokemon))
    cardEl.append(createCardText(pokemon))

}

for (pokemon in data) {
    createCard(data[pokemon]);
}