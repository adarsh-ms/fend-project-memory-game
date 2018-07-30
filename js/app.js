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
	console.log("displayCard",element.classList);
}

function hideCard(element)
{

	element.className = "card";
	console.log("hideCard",element.classList);
}

function cardMatch(element1,element2)
{

	element1.className = "card open show match";
	console.log("cardMatch",element1.classList);
	element2.className = "card open show match";
	console.log("cardMatch",element2.classList);
}

function cardMisMatch(element1,element2)
{

	element1.className = "card open show unmatch";
	console.log("cardMisMatch",element1.classList);
	element2.className = "card open show unmatch";
	console.log("cardMisMatch",element2.classList);
}

let cardList = [];

function saveCardList(element)
{

	cardList.push(element);
	console.log("saveCardList",cardList);
}

function cleanUpCardList()
{

	for(let j=0;j<=cardList.length;j++)
	{
		cardList.pop();
	}

	console.log("cleaned up cardList array",cardList);
}

function computeCardList()
{
	// saveCardList(element);

	const oldElement = cardList[0].firstElementChild.classList;
	const newElement = cardList[1].firstElementChild.classList;

	if(oldElement.toString() === newElement.toString())
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
	console.log("moves",moves);
	document.querySelector('.score-panel .moves').textContent=moves;
}

let remainingMatches =  8;

function matchMonitor()
{

	remainingMatches--;
}

function starCalculation()
{

	let nodes = document.querySelector('.score-panel .stars');
	nodes = Array.prototype.slice.call(nodes.children).slice(0);
	
	if(moves <= 8)
	{

		nodes[2].firstElementChild.className = 'fa fa-star';
		nodes[1].firstElementChild.className = 'fa fa-star';
	}
	
	if(moves > 8)
	{

		console.log("nodes",nodes);
		nodes[2].firstElementChild.classList.add('hideStars');
		console.log("startCalculation",nodes[2].firstElementChild.classList);
	}

	if(moves > 12)
	{

		console.log("nodes",nodes);
		nodes[1].firstElementChild.classList.add('hideStars');
		console.log("startCalculation",nodes[2].firstElementChild.classList);
	}

}

function eventListener(event)
{

	if((event.toString() != cardList[0]) && (event.toString() != cardList[1]))
	{

		incrementMove();	
		starCalculation();

		displayCard(event);
		saveCardList(event);

		if((cardList[0]!=event) && cardList.length!=0)
		{

			hideCard(event);
			const result = computeCardList();
			console.log(result);
			
			if(result === true)
			{
				
				cardMatch(cardList[0],cardList[1]);	

				matchMonitor();
				if(remainingMatches === 0)
				{

					alert("you Won");
				}
			}

			else
			{
				// hideCard(event);
				console.log("Card mismatch");
				setTimeout(cardMisMatch(cardList[0],cardList[1]),0);

				setTimeout(function(){hideCard(cardList[0]);hideCard(cardList[1]);},400);
			}

			setTimeout(cleanUpCardList,400);
		}
	}
}

document.querySelector('.deck').addEventListener('click', 

									function(event)
									{ 

										if(event.target.nodeName === 'LI')
										{
											console.log("event.target:",event.target);
											eventListener(event.target);
										}
									}

);