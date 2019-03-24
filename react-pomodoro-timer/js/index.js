
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundURL: "https://raw.githubusercontent.com/Ventrosky/python-scripts/master/miscellaneous/bell.wav",
      isPaused: false,
      isStarted: false,
      isSession: true,
      minutes: '00',
      seconds: '00',
      remaining: 0,
      countSession: '25',
      countBreack: '05',
      intervalHandle: x => x };

    this.incBreack = this.incBreack.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decBreack = this.decBreack.bind(this);
    this.decSession = this.decSession.bind(this);
    this.addToString = this.addToString.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
    this.ring = this.ring.bind(this);
    this.doResetObj = this.doResetObj.bind(this);
    this.doResetBtn = this.doResetBtn.bind(this);
  }
  numberToString(n) {
    return String(n < 0 ? "00" : n < 10 ? "0" + n : n > 60 ? "60" : n);
  }
  addToString(stringa, value) {
    var countDown = parseInt(stringa) + value;
    return this.numberToString(countDown);
  }
  doResetObj(value1, value2) {
    clearInterval(this.state.intervalHandle);
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    return { countSession: value1, countBreack: value2, isStarted: false, isPaused: false, remaining: 0, minutes: "00", seconds: "00" };
  }
  doResetBtn(value1, value2) {
    clearInterval(this.state.intervalHandle);
    this.setState({
      isPaused: false,
      isStarted: false,
      isSession: true,
      minutes: '00',
      seconds: '00',
      remaining: 0,
      countSession: '25',
      countBreack: '05' });

    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }
  incBreack() {
    let newValue = this.addToString(this.state.countBreack, 1);
    if (newValue > 60) return;
    this.setState(this.doResetObj(this.state.countSession, newValue));
  }
  decBreack() {
    let newValue = this.addToString(this.state.countBreack, -1);
    if (newValue < 1) return;
    this.setState(this.doResetObj(this.state.countSession, newValue));
  }
  incSession() {
    let newValue = this.addToString(this.state.countSession, 1);
    if (newValue > 60) return;
    this.setState(this.doResetObj(newValue, this.state.countBreack));
  }
  decSession() {
    let newValue = this.addToString(this.state.countSession, -1);
    if (newValue < 1) return;
    this.setState(this.doResetObj(newValue, this.state.countBreack));
  }
  ring() {
    const { isSession, countSession, countBreack } = this.state;
    let minutes = isSession ? countBreack : countSession;
    let totSecs = minutes * 60 - 1;
    this.setState({
      isStarted: true,
      isSession: !isSession,
      minutes: this.numberToString(minutes),
      seconds: "00",
      remaining: totSecs,
      intervalHandle: setInterval(this.tick, 1000) });

  }
  tick() {
    var min = Math.floor(this.state.remaining / 60);
    var sec = this.state.remaining - min * 60;
    this.setState({
      minutes: this.numberToString(min),
      seconds: this.numberToString(sec),
      remaining: this.state.remaining - 1 });

    if (min === 0 & sec === 0) {
      clearInterval(this.state.intervalHandle);
      setTimeout(this.ring, 1000);
      let audio = document.getElementById('beep');
      audio.play();
    }
  }
  startCountDown() {
    const { isPaused, isStarted, countBreack, countSession } = this.state;
    if (isStarted && !isPaused) {
      clearInterval(this.state.intervalHandle);
      this.setState({ isPaused: true });
    } else if (!isPaused && !isStarted) {
      let totSecs = countSession * 60 - 1;
      this.setState({
        isStarted: true,
        isSession: true,
        minutes: countSession,
        remaining: totSecs,
        intervalHandle: setInterval(this.tick, 1000) });

    } else if (!isPaused && isStarted) {
      clearInterval(this.state.intervalHandle);
      this.setState({ isPaused: true });
    } else if (isPaused && isStarted) {
      this.setState({
        isPaused: false,
        intervalHandle: setInterval(this.tick, 1000) });

    }
  }
  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("h1", { className: "text-center" }, "Pomodoro Timer"),
      React.createElement("div", { className: "panel panel-default" },
      React.createElement("div", { className: "panel-body text-center" },
      React.createElement("div", { className: "settings" },
      React.createElement(Counter, {
        id: "break",
        fuInc: this.incBreack,
        fuDec: this.decBreack,
        labelCount: this.state.countBreack,
        labelName: "BREAK LENGTH" }),

      React.createElement(Counter, {
        id: "session",
        fuInc: this.incSession,
        fuDec: this.decSession,
        labelCount: this.state.countSession,
        labelName: "SESSION LENGTH" })),


      React.createElement("hr", { class: "style1" }),
      React.createElement(TimerLabel, {
        label: this.state.isSession ? 'SESSION' : 'BREAK' }),

      React.createElement(TimerDiv, {
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        soundURL: this.state.soundURL }),

      React.createElement("div", null,
      React.createElement(StartButton, {
        isPaused: this.state.isPaused,
        isStarted: this.state.isStarted,
        startFu: this.startCountDown,
        resetFu: this.doResetBtn }))))));






  }}



const Counter = props => {
  const { id, fuInc, fuDec, labelCount, labelName } = props;
  return (
    React.createElement("div", { className: "text-left" },
    React.createElement("i", { className: "fa fa-plus-square", id: id + "-increment", onClick: fuInc }), "\xA0",
    React.createElement("div", { className: "orbi", id: id + "-length" }, parseInt(labelCount)), "\xA0",
    React.createElement("i", { className: "fa fa-minus-square", id: id + "-decrement", onClick: fuDec }), React.createElement("span", { id: id + "-label" }, "\xA0", labelName, "\xA0")));


};

const TimerLabel = props => {
  const { label } = props;
  return (
    React.createElement("div", { id: "timer-label" },
    label));


};

const TimerDiv = props => {
  const { minutes, seconds, soundURL } = props;
  return (
    React.createElement("div", { className: "timer-box", id: "time-left" },
    React.createElement("div", null,
    React.createElement("span", { id: "minutes" }, minutes), React.createElement("span", null, ":"), React.createElement("span", { id: "seconds" }, seconds)),

    React.createElement("audio", { className: "clip", src: soundURL, id: "beep" })));


};

const StartButton = props => {
  const { isPaused, isStarted, startFu, resetFu } = props;
  if (isPaused || !isStarted) {
    return (
      React.createElement("div", null,
      React.createElement("button", { className: "btn btn-danger btn-lg", onClick: resetFu, id: "reset" }, React.createElement("span", { className: "fa fa-refresh", "aria-hidden": "true" }), " Reset"),
      React.createElement("button", { className: "btn btn-success btn-lg", onClick: startFu, id: "start_stop" }, React.createElement("span", { className: "fa fa-play", "aria-hidden": "true" }), " Start")));


  } else {
    return (
      React.createElement("div", null,
      React.createElement("button", { className: "btn btn-danger btn-lg", onClick: resetFu, id: "reset" }, React.createElement("span", { className: "fa fa-refresh", "aria-hidden": "true" }), " Reset"),
      React.createElement("button", { className: "btn btn-warning btn-lg", onClick: startFu, id: "start_stop" }, React.createElement("span", { className: "fa fa-pause", "aria-hidden": "true" }), " Pause")));


  }
};
const appDiv = document.getElementById('app');
ReactDOM.render(React.createElement(App, null), appDiv);