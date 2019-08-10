import { connect } from 'react-redux'
import React from 'react';
import LoginComponent from './loginComponent.jsx'
import StartGameComponent from './startGameComponent.jsx';
import ConnectingComponent from './connectingComponent.jsx';
import ErrorComponent from './errorComponent.jsx';
import PromptEntryComponent from './promptEntryComponent.jsx';

class RootComponent extends React.Component {
    render() {
        return <div>
                <ErrorComponent/>
                <ConnectingComponent/>
                <LoginComponent/>
                <StartGameComponent/>
                <PromptEntryComponent/>
            </div>
    }
}

function mapStateToProps(state) {
    return { ...state }
}

export default connect(
   mapStateToProps
)(RootComponent);