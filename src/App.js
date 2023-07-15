import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Life is 10% what happens to me and 90% of how I react to it.");
  const [author, setAuthor] = useState("Charles Swindoll");
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34') 


  
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [])


  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);

  }









  return (
    <div className="App">
      <header className="App-header" style={
        { backgroundColor: accentColor }}>
        <div id="quote-box" style={
          { color: accentColor }}>


          <h1>Random Quote Number: {randomNumber}</h1>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">- {author}</p>
          <div className="buttons">
            <a href="https://www.twitter.com/intent/tweet?text=hello" id="tweet-quote" target="_top" style={
              { backgroundColor: accentColor }}><FontAwesomeIcon icon={faTwitter} /></a>
          
          <button id="new-quote" onClick={() => getRandomQuote()}>New Quote</button>
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
