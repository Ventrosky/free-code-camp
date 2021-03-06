const PATH_BASE = "//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?";
const PATH_TWEET = 'https://twitter.com/intent/tweet?text=';

$(document).ready(function () {
  $("#get-quote").on("click");

  $("#tweet-quote").on("click");
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyze a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects.",
      title: "Robert A. Heinlein",
      source: "",
      tweet: PATH_TWEET };

    this.getQuote = this.getQuote.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
  }
  updateQuote(post) {
    let title = post[0].title;
    let content = $(post[0].content).text();
    let source = post[0].link;
    let link = PATH_TWEET + content + '-' + title;

    this.setState({
      quote: content,
      title: title,
      source: source,
      tweet: link });

  }
  getQuote(e) {
    $.getJSON(PATH_BASE, this.updateQuote);
  }

  render() {
    return (
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "wrap-quote", id: "quote-box" },
      React.createElement("h1", { className: "text-center" }, "Random Quote Machine"),
      React.createElement("blockquote", null,
      React.createElement("span", { id: "text" }, this.state.quote),
      React.createElement("footer", { id: "author" }, this.state.title)),

      React.createElement("div", { id: "#quote-source" }, this.state.source),
      React.createElement("hr", null),
      React.createElement("ul", { className: "list-inline list-unstyled text-center" },
      React.createElement("li", null,
      React.createElement("a", { className: "btn btn-default btn-lg", href: "#", role: "button", id: "new-quote", onClick: this.getQuote }, "Random")),

      React.createElement("li", null,
      React.createElement("a", { className: "btn btn-primary btn-lg", href: this.state.tweet, role: "button", id: "tweet-quote", target: "_" }, React.createElement("i", { className: "fa fa-twitter pr-1" }), " Tweet"))))));





  }}

const appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);