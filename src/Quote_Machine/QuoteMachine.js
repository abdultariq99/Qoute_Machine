import React, { Component } from "react"
import './QuoteMachine.css'

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      bgColor: "#eba487"
    };
    this.changeQuote = this.changeQuote.bind(this);
  }
  async componentDidMount() {
    await this.fetchNewQuote();
  }

  fetchNewQuote = async () => {
    let callData = await fetch("https://api.quotable.io/quotes/random");
    let parsedData = await callData.json();
    let randomQuote = parsedData[0].content;
    let authorName = parsedData[0].author;
    this.setState({
      quote: randomQuote,
      author: authorName
    });
  };

  colorChange = () => {
    let colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];
    let currentColor = this.state.bgColor;
    let index = colors.indexOf(currentColor);
    let newColor = colors[(index + 1) % colors.length];
    this.setState({
      bgColor: newColor
    });
  };

  async changeQuote() {
    await this.fetchNewQuote();
    await this.colorChange();
  }

  render() {
    return (
      <body style={{ backgroundColor: this.state.bgColor }}>
        <div className="container d-flex align-items-center justify-content-center">
          <div id="wrapper">
            <div id="quote-box">
              <div
                id="text"
                className="text-center"
                style={{ color: this.state.bgColor }}
              >
                <p>
                  <span>“</span>
                  {this.state.quote}
                </p>
              </div>
              <div
                id="author"
                className="text-end"
                style={{ color: this.state.bgColor }}
              >
                - {this.state.author}
              </div>

              <div
                id="btn-wrapper"
                className="d-flex p-2 flex-row justify-content-center"
              >
                <a
                  id="tweet-quote"
                  target="_blank"
                  href="twitter.com/intent/tweet"
                >
                  <button
                    type="button"
                    id="btn-1"
                    className="p-2 btn"
                    style={{ backgroundColor: this.state.bgColor }}
                  >
                    <img
                      id="logo-1"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/640px-X_logo_2023_%28white%29.png"
                    ></img>
                  </button>
                </a>

                <a
                  target="_blank"
                  href={`https://www.bing.com/search?q=${this.state.author}`}
                >
                  <button
                    type="button"
                    id="btn-2"
                    className="p-2 btn"
                    style={{ backgroundColor: this.state.bgColor }}
                  >
                    About Author
                  </button>
                </a>

                <button
                  type="button"
                  id="new-quote"
                  className="btn ms-auto"
                  onClick={this.changeQuote}
                  style={{ backgroundColor: this.state.bgColor }}
                >
                  Next Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default QuoteMachine;