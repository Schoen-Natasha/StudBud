const btn = document.getElementById("submitButton");
const searchResultContainer = document.getElementById("definitionsContainer")


//DICTIONARY 
var api = "https://api.dictionaryapi.dev/api/v2/entries/en/"
//add word thats getting looked up at the end of the link

let amountOfClicks = 0;

btn.addEventListener('click', () => {
  amountOfClicks++;
  if (amountOfClicks >= 1) {
    //when user searches a new word, reset the search results and render the new one
    resetSearchContainer(searchResultContainer);
    amountOfClicks = 0;
  }
  console.log("click has been detected");
  const searchedWord = document.getElementById("searchedWord");
  getDefinition(searchedWord.value);
});




function getDefinition(word) {
  var link = api + word;
  //find all required information from api for the word being searched
  console.log(link);
  fetch(link)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      //console.log(data[0].meanings[0].definitions[0].definition);
      renderDefinition(data);
    })
    
    //.then((wordInput) => renderDefinition(wordInput))
};




function renderDefinition(wordData) {
  //maybe try storing info into one word object, then iterate through appending each one to be displayed
  
  //get information about word searched and show on screen
  console.log(wordData[0]);

  //Display following info from the api:
  //Name of word that got searched
  let wordGettingDefined = document.createElement("h1");
  wordGettingDefined.innerHTML = wordData[0].word;
  searchResultContainer.appendChild(wordGettingDefined);

  //the words function (adjective, adverb, noun, etc)
  let wordType = document.createElement("p");
  wordType.innerHTML = wordData[0].meanings[0].partOfSpeech;
  searchResultContainer.appendChild(wordType);

  //separate information to make it more readable
  let line = document.createElement("hr");
  searchResultContainer.appendChild(line);
  
  //word definition
  let wordDefinition = document.createElement("p");
  wordDefinition.innerHTML = wordData[0].meanings[0].definitions[0].definition;
  searchResultContainer.appendChild(wordDefinition);


  //For Synonyms
  let synonymHeading = document.createElement("h3");
  synonymHeading.innerHTML = "Synonyms";
  searchResultContainer.appendChild(synonymHeading);

  findSynonyms(wordData);
  
}


//Find where synonyms are located in the api
function findSynonyms(wordInput) {
  //loop through all meanings
  for (let j = 0; j < wordInput[0].meanings.length; j++) {
    let synonymArrayLocation = Object.keys(wordInput[0].meanings[j]);
      for (let i = 0; i < synonymArrayLocation.length - 1; i++) {
        if (synonymArrayLocation[i] == "synonyms" && wordInput[0].meanings[j].synonyms.length > 0) {
          console.log("synonyms are being checked");
          let synonymLocation = wordInput[0].meanings[j].synonyms;
          printSynonyms(synonymLocation);
        }
      }
  }
}


//Display synonyms to page
function printSynonyms(synonymArray) {
  let synonymContainer = document.createElement("div");
  synonymContainer.classList.add("synonymsContainer");
  searchResultContainer.appendChild(synonymContainer);
  for (let i = 0; i < synonymArray.length; i++) {
    let synonym = document.createElement("p");
    synonym.innerHTML = synonymArray[i];
    synonym.classList.add("synonym")
    synonymContainer.appendChild(synonym);
    
  }
}


//wipe previous search information to display next searched word
function resetSearchContainer(searchResultContainer) {
  //removes all child nodes of the search container
    while (searchResultContainer.firstChild) {
        searchResultContainer.removeChild(searchResultContainer.firstChild);
    }
}
