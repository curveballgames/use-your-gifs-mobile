import LoginComponent from './loginComponent.jsx'

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <LoginComponent/>
      </div>
  }
}

const domContainer = document.querySelector('#main');
const mainComp = <MainComponent></MainComponent>

ReactDOM.render(mainComp, domContainer);