import React, { useState } from "react";

import { BrowserRouter, Route, Link, Redirect, Router } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

import NewsCard from "./NewsCard";
import Home from "./Home";
import Header from "./Header";

let flagButtonCliked = false

const sourceNews = async(transcript) => {

let input = transcript
let srcflg,srcfilter,srcUrl,src;
let sources = ["BBC","CNN","CNBC","ABC","THE HINDU"];
 
//Getting the source from the user command
  for(let i =0 ; i < sources.length ; i++){
    if(input.includes(sources[i])){
       srcflg = true;
                
    if(sources[i] == "BBC"){
       srcfilter = "bbc-news"
    }
    else{
       srcfilter = sources[i]
     }
    }
  }
console.log(srcflg,srcfilter)
src = srcfilter.toLowerCase();
        
    if(srcflg === true){
       srcUrl =  `https://newsapi.org/v2/top-headlines?sources=${src}&apiKey=f77c5e7f252b449db85cff6861ada979`
     }
  
 //Getting the news from the api    
let {data} = await axios.get(srcUrl);
console.log(data.articles)

}

const categoryNews = async() => {

let input = "Show me the latest business news from india";
let catflg,catfilter,catUrl;
let category = ["business","entertainment","general","health","science","sports","technology","biology","political"]
    
//Getting the category from the user command
 for(let i =0 ; i < category.length ; i++){
  if(input.includes(category[i])){
     catflg = true;
     catfilter = category[i]
    }
 }
  console.log(catflg, catfilter)
            
  if(catflg === true){
    catUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${catfilter}&apiKey=f77c5e7f252b449db85cff6861ada979`
  }
  
//Getting the news from the api
  const {data} = await axios.get(catUrl);
  console.log(data)
  return data
}

const termNews = async() => {
let termUrl;
  
let input = "Whats up with Bitcoin"
var slicedterm = input.slice(13)
var slicedtermlow = slicedterm.toLowerCase()
  
termUrl = `https://newsapi.org/v2/everything?q=${slicedtermlow}&apiKey=f77c5e7f252b449db85cff6861ada979`
  
const {data} = await axios.get(termUrl);
console.log(data)
  
console.log(slicedterm);
}

const latestNews = () => {

}

const App = () => {
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");

  const pages = ["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    blog: "/blog",
    "new blog post": "/blog/new",
    contact: "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

//
if(flagButtonCliked){
  sourceNews(transcript)

}
//

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/"><button>Home</button></Link>
          <Link to="/news"><button>News</button></Link>
          
        </div>

        <Route path="/">
           <Home/>
        </Route>
    
         {redirect}
      </BrowserRouter>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>

      <p id="transcript">Transcript: {transcript}</p>

      <button onClick="handleButtonClicked()">Start</button>
      <script>
        function handleButtonClicked  ()  {
  flagButtonCliked = true
  SpeechRecognition.startListening
}</script>
    </div>
  );
}

export default App;