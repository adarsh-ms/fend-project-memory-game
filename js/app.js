/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const list = document.querySelector('.deck');
const fragment = document.createDocumentFragment();

function shuffleNodes()
{
    let nodes = list.children, i = 0;
    nodes = Array.prototype.slice.call(nodes);
    nodes = shuffle(nodes.slice(0));
    while(i < nodes.length)
    {
        fragment.appendChild(nodes[i]);
        ++i;
    }

   	list.appendChild(fragment);
}

const initial1 = performance.now();
shuffleNodes();
const final1 = performance.now();
console.log(final1 - initial1);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function displayCard(element)
{
	
	element.classList.add('open', 'show');
	console.log(element.classList);
}

function hideCard(element)
{

	element.classList.add('open', 'show', 'unmatch');
	console.log(element.classList);
}

function cardMatch(element1,element2)
{

	element1.className = "card open show match";
	console.log(element1.classList);
	element2.className = "card open show match";
	console.log(element2.classList);
}

function cardMisMatch(element1,element2)
{

	element1.className = "card";
	console.log(element1.classList);
	element2.className = "card";
	console.log(element2.classList);
}

let cardList = [];

function saveCardList(element)
{

	cardList.push(element);
	console.log(cardList);
}

function cleanUpCardList()
{

	for(let j=0;j<cardList.length;j++)
	{
		cardList.pop();
	}

	console.log("cleaned up cardList array");
}

function computeCardList()
{
	// saveCardList(element);

	const oldElement = cardList[0].firstElementChild.classList;
	const newElement = cardList[1].firstElementChild.classList;

	if(oldElement === newElement)
	{
		console.log("Cards are matching");
		return(true);
	}

	else
	{

		return(false);
	}

}

let moves = 0;

function incrementMove()
{
	moves++;
	console.log(moves);
}


