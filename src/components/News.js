import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  constructor() {
    super();
    console.log("hello bro, I am a constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=27112c5b82de4da2b0860df903f501d6";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
  }

  handlePrevClick = async () => {
    let url =
    // `https://newsapi.org/v2/top-headlines?country=in&apiKey=27112c5b82de4da2b0860df903f501d6&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    });
  }

  handleNextClick = async () => {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=in&apiKey=27112c5b82de4da2b0860df903f501d6&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    });
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - top headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://cdn.cnn.com/cnnnext/dam/assets/211105212006-01-pollution-diwali-india-delhi-1105-super-tease.jpg"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container my-5 d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePrevClick}>
          &larr; Previous
          </button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
