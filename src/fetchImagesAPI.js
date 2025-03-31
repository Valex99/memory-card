export default async function fetchPokemonImg(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // WHY [] and not .?
    // The key "official-artwork" contains a hyphen (-), which is not a valid variable name in JavaScript.
    // Dot notation (.) does not work with property names that have special characters.
    // If the API used camelCase or snake_case instead (e.g., officialArtwork or official_artwork), then you could use dot notation

    const imageUrl = data.sprites.other["official-artwork"].front_default;

    // console.log("data", data);
    //console.log(data.species.url);
    //console.log(imageUrl);

    return { name: data.species.name, img: imageUrl };
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return null;
  }
}
