'use strict';

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText= document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

// Start loading

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// Stop loading 

function stopLoading(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

function newQuotes(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
    // If the author is null then change it to unknown
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else {
        authorText.textContent = quote.author;
    }

    // If the quote is longer then make the fontsize a bit small 
    if(quote.text.length > 120){
        quoteText.classList.add("long-quote");
    }else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    stopLoading();
}

// get quotes from api
async function getQuotes(){
    loading();
    const apiUrl= 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    }catch(error){
        alert(error);
    }
}

// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();
