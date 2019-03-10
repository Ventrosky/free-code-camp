var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PATH_BASE = 'https://fcctop100.herokuapp.com/api/fccusers/top';
var PARAM_RECENT = '/recent';
var PARAM_ALLTIME = '/alltime';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this._isMounted = false;


    _this.state = {
      recentList: [],
      alltimeList: [],
      error: null,
      isLoading: false
    };

    _this.setSearch = _this.setSearch.bind(_this);
    _this.fetchSearch = _this.fetchSearch.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'setSearch',
    value: function setSearch(result, searchParam) {
      if (searchParam == PARAM_RECENT) {
        this.setState({ recentList: result });
      } else if (searchParam == PARAM_ALLTIME) {
        this.setState({ alltimeList: result });
      }
      if (this.state.recentList != [] && this.state.alltimeList != []) {
        this.setState({ isLoading: false });
      }
    }
  }, {
    key: 'fetchSearch',
    value: function fetchSearch(searchParam) {
      var _this2 = this;

      this.setState({ isLoading: true });
      fetch('' + PATH_BASE + searchParam).then(function (response) {
        return response.json();
      }).then(function (result) {
        return _this2._isMounted && _this2.setSearch(result, searchParam);
      }).catch(function (error) {
        return _this2._isMounted && _this2.setState({ error: error });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._isMounted = true;
      this.fetchSearch(PARAM_RECENT);
      this.fetchSearch(PARAM_ALLTIME);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          recentList = _state.recentList,
          alltimeList = _state.alltimeList,
          error = _state.error,
          isLoading = _state.isLoading;

      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'row text-center' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'h1',
              null,
              'Camper Leaderboard'
            ),
            React.createElement(
              'p',
              null,
              ' freeCodeCamp\'s project - build a camper leaderboard'
            )
          )
        ),
        error ? React.createElement(
          'div',
          { className: 'interactions' },
          React.createElement(
            'p',
            null,
            'Something went wrong.'
          )
        ) : React.createElement(Table, {
          recentList: recentList,
          alltimeList: alltimeList
        })
      );
    }
  }]);

  return App;
}(React.Component);

var midColumn = {
  width: '30%'
};
var smallColumn = {
  width: '10%'
};

var Table = function (_React$Component2) {
  _inherits(Table, _React$Component2);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this3 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this3.state = {
      sortKey: 'RECENT'
    };

    _this3.onSort = _this3.onSort.bind(_this3);
    return _this3;
  }

  _createClass(Table, [{
    key: 'onSort',
    value: function onSort(sortKey) {
      this.setState({ sortKey: sortKey });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          recentList = _props.recentList,
          alltimeList = _props.alltimeList;
      var sortKey = this.state.sortKey;


      var i = 0;

      return React.createElement(
        'div',
        { className: 'table' },
        React.createElement(
          'div',
          { className: 'table-header' },
          React.createElement(
            'span',
            { style: { width: '10%' } },
            '#'
          ),
          React.createElement(
            'span',
            { style: { width: '30%' } },
            'Camper Name'
          ),
          React.createElement(
            'span',
            { style: { width: '30%' }, className: 'text-center' },
            React.createElement(
              Sort,
              {
                sortKey: 'RECENT',
                onSort: this.onSort,
                activeSortKey: sortKey
              },
              'Point past 30 days',
              React.createElement(
                'span',
                null,
                '\xA0'
              ),
              sortKey === 'RECENT' ? React.createElement('i', { className: 'fa fa-sort-desc' }) : React.createElement(
                'i',
                { className: '' },
                '\xA0'
              )
            )
          ),
          React.createElement(
            'span',
            { style: { width: '30%' }, className: 'text-center' },
            React.createElement(
              Sort,
              {
                sortKey: 'ALLTIME',
                onSort: this.onSort,
                activeSortKey: sortKey
              },
              'All time points',
              React.createElement(
                'span',
                null,
                '\xA0'
              ),
              sortKey === 'ALLTIME' ? React.createElement('i', { className: 'fa fa-sort-desc' }) : React.createElement(
                'i',
                { className: '' },
                '\xA0'
              )
            )
          )
        ),
        (sortKey === 'RECENT' ? recentList : alltimeList).map(function (item) {
          return React.createElement(
            'div',
            { key: i, className: 'table-row' },
            React.createElement(
              'span',
              { style: smallColumn },
              i = i + 1
            ),
            React.createElement(
              'span',
              { style: midColumn },
              ' ',
              React.createElement('img', { src: item.img, className: 'profileImg img-fluid', alt: 'Responsive image' }),
              item.username
            ),
            React.createElement(
              'span',
              { style: midColumn, className: 'text-center' },
              ' ',
              item.recent
            ),
            React.createElement(
              'span',
              { style: midColumn, className: 'text-center' },
              ' ',
              item.alltime
            )
          );
        })
      );
    }
  }]);

  return Table;
}(React.Component);

var Button = function Button(_ref) {
  var onClick = _ref.onClick,
      className = _ref.className,
      children = _ref.children;
  return React.createElement(
    'button',
    {
      onClick: onClick,
      className: className,
      type: 'button'
    },
    children
  );
};

var Sort = function Sort(_ref2) {
  var sortKey = _ref2.sortKey,
      activeSortKey = _ref2.activeSortKey,
      onSort = _ref2.onSort,
      children = _ref2.children;

  var sortClass = ['button-inline'];
  if (sortKey == activeSortKey) {
    sortClass.push('button-active');
  }

  return React.createElement(
    Button,
    {
      onClick: function onClick() {
        return onSort(sortKey);
      },
      className: sortClass.join(' ')
    },
    children
  );
};

var appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);