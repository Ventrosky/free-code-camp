class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      display: " ",
      highlated: "",
      pads: [{
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
      {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
      {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
      {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
      {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
      {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
      {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
      {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
      {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }] };



    this.clickManager = this.clickManager.bind(this);
    this.keyManager = this.keyManager.bind(this);
  }
  reproduceSound(sound) {
    sound.currentTime = 0;
    sound.play();
    this.setState({
      display: sound.getAttribute("data-name"),
      highlated: sound.id });

    setTimeout(function () {
      $("#" + sound.getAttribute("data-name")).removeClass("highlated");
    }, 400);
  }
  clickManager(e) {
    const sound = document.getElementById(e.target.id).children[0];
    this.reproduceSound(sound);
  }

  keyManager(event) {
    var value = String.fromCharCode(event.keyCode);
    const sound = document.getElementById(value);
    this.reproduceSound(sound);
  }
  componentDidMount() {
    window.addEventListener('keyup', this.keyManager);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.keyManager);
  }
  render() {
    const { play, pads, highlated } = this.state;
    return (
      React.createElement("div", { className: "container", id: "drum-machine" },
      React.createElement("div", { className: "row", id: "main" },
      React.createElement("div", { className: "col-md-2" }),
      React.createElement("div", { className: "wrapper col-md-4" },
      pads.map((pad) =>
      React.createElement(DrumPad, {
        keyTrigger: pad.keyTrigger,
        id: pad.id,
        clickManager: this.clickManager,
        url: pad.url,
        highlated: highlated }))),



      React.createElement("div", { className: "col-md-4" },
      React.createElement("div", { className: "row" },
      React.createElement("h2", null, "Drum Machine")),

      React.createElement("div", { className: "row" },
      React.createElement("h3", null, "fCC Project")),

      React.createElement("div", { className: "row" },
      React.createElement(Display, { soundname: this.state.display }))),


      React.createElement("div", { className: "col-md-2" }))));



  }}


const Display = props => {
  const { soundname } = props;
  return (
    React.createElement("p", { id: "display", className: "centre" },
    soundname));


};

const DrumPad = props => {
  const { keyTrigger, id, clickManager, url, highlated } = props;
  return (
    React.createElement("div", { className: 'drum-pad' + (highlated == keyTrigger ? ' highlated' : ''), id: id, key: keyTrigger, onClick: clickManager },
    keyTrigger,
    React.createElement("audio", { className: "clip", "data-name": id, id: keyTrigger, src: url })));


};

const appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);