
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keysBtnC: [
      { label: "AC", id: "clear" },
      { label: "CE", id: "clear2" },
      { label: ".", id: "decimal" },
      { label: "/", id: "divide" },
      { label: "7", id: "seven" },
      { label: "8", id: "eight" },
      { label: "9", id: "nine" },
      { label: "*", id: "multiply" },
      { label: "4", id: "four" },
      { label: "5", id: "five" },
      { label: "6", id: "six" },
      { label: "-", id: "subtract" },
      { label: "1", id: "one" },
      { label: "2", id: "two" },
      { label: "3", id: "three" },
      { label: "+", id: "add" },
      { label: "0", id: "zero" },
      { label: "=", id: "equals" }],

      memNumber: 0,
      doRestart: false,
      calcscreen: "0" };

    this.handleClick = this.handleClick.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({ memNumber: 0, calcscreen: "0" });
  }
  updateDisplay(n) {
    var prev = this.state.calcscreen;
    if (prev == "0" && [".", "+", "-", "/", "*"].indexOf(n) > -1) {
      doRestart = false;
      prev = "0" + n;
      this.setState({ calcscreen: prev });
    } else {
      this.setState({ calcscreen: (prev == "0" ? "" : prev) + n });
    }
  }
  handleClick(e) {
    var displayStr = this.state.calcscreen;
    var lastChar = displayStr.charAt(displayStr.length - 1);
    var lastNum = displayStr.split(/[\+\-\/\*]/);
    lastNum = lastNum[lastNum.length - 1];
    console.log(e.target);
    switch (e.target.value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (this.state.doRestart) {
          this.reset();
          this.setState({ doRestart: false });
        }
        this.updateDisplay(e.target.value);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        if (this.state.doRestart) this.setState({ doRestart: false });
        if (!lastChar.match(/[\+\-\/\*]/gi)) {
          this.updateDisplay(e.target.value);
          //} else if (["+","-"].indexOf(e.target.value)>-1){
          //var secondLast = displayStr.charAt(displayStr.length-2);
          //if (!(secondLast.match(/[\+\-\/\*]/gi))) {
          //  this.updateDisplay(e.target.value);
          //}else {
          //  this.setState({calcscreen: this.state.calcscreen.replace(/.$/,e.target.value)});
          //}
        } else {
          this.setState({ calcscreen: this.state.calcscreen.replace(/.$/, e.target.value) });
        };
        break;
      case "AC":
        this.reset();
        break;
      case "CE":
        if (displayStr.length > 1) {
          this.setState({ calcscreen: displayStr.substring(0, displayStr.length - 1) });
        } else {
          this.setState({ calcscreen: 0 });
        }
        break;
      case ".":
        if (!lastNum.includes(".") && !lastChar.match(/[\+\-\/\*]/gi)) this.updateDisplay(".");
        if (lastChar.match(/[\+\-\/\*]/gi)) this.updateDisplay("0.");
        break;
      case "=":
        var lastChar = displayStr.charAt(displayStr.length - 1);
        if (lastChar.match(/[\+\-\/\*]/gi)) {
          this.setState({ calcscreen: displayStr.substring(0, displayStr.length - 1), doRestart: true });
        }
        this.setState({ calcscreen: String(math.eval(this.state.calcscreen)), doRestart: true });}
    ;
  }
  render() {
    const { keysBtnC, calcscreen } = this.state;
    return (
      React.createElement("div", { className: "container container-calc" },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-md-4 col-md-offset-4" },
      React.createElement("div", { className: "panel", id: "my-calc" },
      React.createElement("div", { className: "panel-body calc-body" },
      React.createElement("h5", null, " CALCULATOR "),
      React.createElement(Display, { stringa: calcscreen }),
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "wrapper" },
      keysBtnC.map((btn) =>
      React.createElement(KeyButton, {
        keyID: btn.id,
        keyValue: btn.label,
        clickFu: this.handleClick }))))))))));










  }}

const Display = props => {
  const { stringa } = props;
  return (
    React.createElement("div", { className: "form-control text-right", id: "display", type: "text" }, stringa));

};
const KeyButton = props => {
  const { keyID, keyValue, clickFu } = props;
  return (
    React.createElement("button", { className: "btn btn-calc " + (keyValue == "0" || keyValue == "=" ? "btn-zero" : ""), value: keyValue, onClick: clickFu, id: keyID }, keyValue));

};


const appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);