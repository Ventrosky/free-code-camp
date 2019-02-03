var _this2 = this;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_RAW = 'Raw Text \n=======\nMarked in browser\n-----------\nRendered by **marked**.\n\nText attributes *italic*, **bold**, `monospace`, ~~strikethrough~~.\n\nUsing:\n  * ReactJS\n  * JavaScript\n  * Sass\n\nLibraries:\n  1. jQuery\n  2. Bootstrap\n  3. Marked\n\n[GitHub](https://github.com/Ventrosky)';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      rawText: DEFAULT_RAW
    };
    _this.onRawChange = _this.onRawChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "onRawChange",
    value: function onRawChange(event) {
      this.setState({ rawText: event.target.value });
    }
  }, {
    key: "render",
    value: function render() {
      var rawText = this.state.rawText;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row text-center" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h1",
              null,
              "Markdown Previewer "
            ),
            React.createElement(
              "p",
              null,
              "Build a Markdown Previewer - freeCodeCamp Project."
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "rawText col-md-6" },
            React.createElement(InputView, {
              value: rawText,
              onChange: this.onRawChange
            })
          ),
          React.createElement(
            "div",
            { className: "markedText col-md-6" },
            React.createElement(MarkedView, {
              rawText: rawText
            })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var InputView = function InputView(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange;
  return React.createElement(
    "div",
    { className: "form-group" },
    React.createElement("textarea", {
      className: "form-control rounded-0",
      id: "textarea1",
      rows: "24",
      value: value,
      onChange: onChange,
      ref: function ref(node) {
        _this2.textarea = node;
      }
    })
  );
};

var MarkedView = function (_React$Component2) {
  _inherits(MarkedView, _React$Component2);

  function MarkedView(props) {
    _classCallCheck(this, MarkedView);

    var _this3 = _possibleConstructorReturn(this, (MarkedView.__proto__ || Object.getPrototypeOf(MarkedView)).call(this, props));

    _this3.parseRaw = _this3.parseRaw.bind(_this3);
    return _this3;
  }

  _createClass(MarkedView, [{
    key: "parseRaw",
    value: function parseRaw(rawText) {
      var markedRaw = marked(rawText, { sanitize: true });
      return { __html: markedRaw };
    }
  }, {
    key: "render",
    value: function render() {
      var rawText = this.props.rawText;

      return React.createElement("span", { dangerouslySetInnerHTML: this.parseRaw(rawText) });
    }
  }]);

  return MarkedView;
}(React.Component);

var appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);