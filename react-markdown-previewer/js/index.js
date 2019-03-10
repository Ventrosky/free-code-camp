const DEFAULT_RAW = `
Raw Text 
=======
Marked in browser
-----------
Rendered by **marked**.

Text attributes *italic*, **bold**, ~~strikethrough~~, \`monospace\`.

Using:
* ReactJS
* JavaScript
* Sass

Libraries:
1. jQuery
2. Bootstrap
3. Marked

[GitHub](https://github.com/Ventrosky) 

>Blockquoted: <http://example.com/> 

Link: <http://example.com/>.

code block on the first line

![Google Logo](http://www.google.com/images/errors/logo_sm.gif)

# Heading level 1

## Heading level 2

\`\`\`
   function fu(a) {
      return a;
   }
\`\`\`
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rawText: DEFAULT_RAW };

    this.onRawChange = this.onRawChange.bind(this);
  }

  onRawChange(event) {
    this.setState({ rawText: event.target.value });
  }

  render() {
    const { rawText } = this.state;
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "row text-center" },
      React.createElement("div", null,
      React.createElement("h1", null, "Markdown Previewer "),
      React.createElement("p", null, "Build a Markdown Previewer - freeCodeCamp Project."))),




      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "rawText col-md-6" },
      React.createElement(InputView, {
        value: rawText,
        onChange: this.onRawChange })),



      React.createElement("div", { className: "markedText col-md-6" },
      React.createElement(MarkedView, {
        rawText: rawText })))));






  }}


const InputView = ({ value, onChange }) =>
React.createElement("div", { className: "form-group" },
React.createElement("textarea", {
  className: "form-control rounded-0",
  id: "editor",
  rows: "24",
  value: value,
  onChange: onChange,
  ref: node => {this.textarea = node;} }));




class MarkedView extends React.Component {
  constructor(props) {
    super(props);
    this.parseRaw = this.parseRaw.bind(this);
  }
  parseRaw(rawText) {
    var markedRaw = marked(rawText, { sanitize: true, breaks: true });
    return { __html: markedRaw };
  }
  render() {
    const {
      rawText } =
    this.props;
    return (
      React.createElement("span", { id: "preview", dangerouslySetInnerHTML: this.parseRaw(rawText) }));

  }}


const appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);