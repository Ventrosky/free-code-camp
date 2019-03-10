var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      recipes: []
    };
    _this._editMode = -1;
    _this.loadLocal = true;
    _this.addButton = _this.addButton.bind(_this);
    _this.deleteRecipe = _this.deleteRecipe.bind(_this);
    _this.saveRecipe = _this.saveRecipe.bind(_this);
    _this.editRecipe = _this.editRecipe.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.loadLocal) {
        var placeOlder = [{ title: "Recipe 1", ingredients: "item 1, item 2, item 3" }, { title: "Recipe 2", ingredients: "item 1, item 2" }, { title: "Recipe 3", ingredients: "item 1, item 2, item 3, item 4" }];

        var itemsArray = localStorage.getItem('_BuccaneerDev_recipes') ? JSON.parse(localStorage.getItem('_BuccaneerDev_recipes')) : placeOlder;
        this.setState({ recipes: itemsArray });
        this.loadLocal = false;
      }
    }
  }, {
    key: "addButton",
    value: function addButton(e) {
      this._editMode = -1;
      $("#title").val('');
      $("#ingredients").val('');
      $(".modal-title").text("Add New Recipe");
      $("#myModal").modal('show');
    }
  }, {
    key: "deleteRecipe",
    value: function deleteRecipe(e) {
      var target = e.currentTarget || e.srcElement;
      var id = target.id;
      var newRecipes = [].concat(_toConsumableArray(this.state.recipes));
      var appo = [].concat(_toConsumableArray(newRecipes.slice(0, id)), _toConsumableArray(newRecipes.slice(parseInt(id) + 1)));

      localStorage.setItem('_BuccaneerDev_recipes', JSON.stringify(appo));
      this.setState({ recipes: appo });
    }
  }, {
    key: "saveRecipe",
    value: function saveRecipe(e) {
      e.preventDefault();
      var newRecipe = {};
      newRecipe.title = $("#title").val();
      newRecipe.ingredients = $("#ingredients").val();
      $("#myModal").modal('hide');
      var appo = [];
      if (this._editMode != -1) {
        var newRecipes = [].concat(_toConsumableArray(this.state.recipes));

        appo = [].concat(_toConsumableArray(newRecipes.slice(0, this._editMode)), _toConsumableArray(newRecipes.slice(this._editMode + 1)), [newRecipe]);
        this._editMode = -1;
      } else {
        appo = [].concat(_toConsumableArray(this.state.recipes), [newRecipe]);
      }

      localStorage.setItem('_BuccaneerDev_recipes', JSON.stringify(appo));
      this.setState({ recipes: appo });
    }
  }, {
    key: "editRecipe",
    value: function editRecipe(e) {
      var target = e.currentTarget || e.srcElement;
      var id = target.id;
      console.log(id);
      this._editMode = parseInt(id);
      var modRecipe = this.state.recipes[id];
      $("#title").val(modRecipe.title);
      $("#ingredients").val(modRecipe.ingredients);
      $(".modal-title").text("Edit Recipe");
      $("#myModal").modal('show');
    }
  }, {
    key: "render",
    value: function render() {
      var recipes = this.state.recipes;
      return React.createElement(
        "div",
        { className: "container text-center" },
        React.createElement(
          "h1",
          null,
          "Recipe Box"
        ),
        React.createElement(
          "p",
          null,
          " work in progres "
        ),
        React.createElement(Accordion, {
          data: recipes,
          delFunc: this.deleteRecipe,
          modFunc: this.editRecipe
        }),
        React.createElement(ModalAdd, {
          title: "Add New Recipe",
          onClick: this.saveRecipe,
          addButton: this.addButton })
      );
    }
  }]);

  return App;
}(React.Component);

var ItemTable = function (_React$Component2) {
  _inherits(ItemTable, _React$Component2);

  function ItemTable() {
    _classCallCheck(this, ItemTable);

    return _possibleConstructorReturn(this, (ItemTable.__proto__ || Object.getPrototypeOf(ItemTable)).apply(this, arguments));
  }

  _createClass(ItemTable, [{
    key: "render",
    value: function render() {
      var items = this.props.items.split(',');
      var i = 0;
      return React.createElement(
        "table",
        { className: "table table-bordered" },
        React.createElement(
          "tbody",
          null,
          items.map(function (item) {
            return React.createElement(
              "tr",
              { key: i++ },
              React.createElement(
                "td",
                null,
                item
              )
            );
          })
        )
      );
    }
  }]);

  return ItemTable;
}(React.Component);

var Accordion = function (_React$Component3) {
  _inherits(Accordion, _React$Component3);

  function Accordion() {
    _classCallCheck(this, Accordion);

    return _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).apply(this, arguments));
  }

  _createClass(Accordion, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      var delFunc = this.props.delFunc;
      var modFunc = this.props.modFunc;
      var count = 0;
      return React.createElement(
        "div",
        { className: "panel-group accordion", id: "accordion" },
        data.map(function (item) {
          return React.createElement(Section, {
            key: count,
            title: item.title,
            secId: "collapse" + count++,
            items: item.ingredients,
            delFunc: delFunc,
            modFunc: modFunc
          });
        })
      );
    }
  }]);

  return Accordion;
}(React.Component);

var Section = function (_React$Component4) {
  _inherits(Section, _React$Component4);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
  }

  _createClass(Section, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          secId = _props.secId,
          items = _props.items,
          delFunc = _props.delFunc,
          modFunc = _props.modFunc;

      return React.createElement(
        "div",
        { className: "panel panel-info text-left" },
        React.createElement(
          "div",
          { className: "panel-heading" },
          React.createElement(
            "div",
            { className: "panel-title", "data-toggle": "collapse", "data-target": "#" + secId, "data-parent": "#accordion" },
            this.props.title
          ),
          React.createElement(
            "span",
            null,
            React.createElement(
              Button,
              {
                onClick: delFunc,
                className: "button-inline",
                secId: secId.replace('collapse', '')
              },
              React.createElement(
                "i",
                { className: "fa fa-trash", "aria-hidden": "true" },
                " Delete"
              )
            )
          ),
          " \xA0\xA0\xA0\xA0",
          React.createElement(
            "span",
            null,
            React.createElement(
              Button,
              {
                onClick: modFunc,
                className: "button-inline",
                secId: secId.replace('collapse', '')
              },
              React.createElement(
                "i",
                { className: "fa fa-pencil", "aria-hidden": "true" },
                " Edit"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: secId, className: "panel-collapse collapse" },
          React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(ItemTable, {
              items: items
            })
          )
        )
      );
    }
  }]);

  return Section;
}(React.Component);

var ModalAdd = function ModalAdd(_ref) {
  var title = _ref.title,
      onClick = _ref.onClick,
      addButton = _ref.addButton;
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "button",
      { type: "button", className: "btn btn-info btn-lg", onClick: addButton },
      "Add Recipe"
    ),
    React.createElement(
      "div",
      { className: "modal fade", id: "myModal", role: "dialog" },
      React.createElement(
        "div",
        { className: "modal-dialog" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-header" },
            React.createElement(
              "button",
              { type: "button", className: "close", "data-dismiss": "modal" },
              "\xD7"
            ),
            React.createElement(
              "h4",
              { className: "modal-title" },
              title
            )
          ),
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(RecipeForm, null)
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              { type: "button", onClick: onClick, className: "btn btn-info" },
              "Save"
            ),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
              "Close"
            )
          )
        )
      )
    )
  );
};

var Button = function Button(_ref2) {
  var onClick = _ref2.onClick,
      className = _ref2.className,
      secId = _ref2.secId,
      children = _ref2.children;
  return React.createElement(
    "button",
    {
      onClick: onClick,
      className: className,
      type: "button",
      id: secId
    },
    children
  );
};

var RecipeForm = function RecipeForm() {
  return React.createElement(
    "form",
    { className: "form-horizontal" },
    React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { className: "control-label col-sm-3" },
        "Recipe name:"
      ),
      React.createElement(
        "div",
        { className: "col-sm-9" },
        React.createElement("input", { type: "text", className: "form-control", placeholder: "Name", id: "title" })
      )
    ),
    React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { className: "control-label col-sm-3" },
        "Ingredients:"
      ),
      React.createElement(
        "div",
        { className: "col-sm-9" },
        React.createElement("textarea", { rows: "4", className: "form-control", placeholder: "Ingredients, Commas, Separated", id: "ingredients" })
      )
    )
  );
};

var appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);