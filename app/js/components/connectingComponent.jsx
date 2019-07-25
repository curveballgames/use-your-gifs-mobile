import { connect } from 'react-redux'
import React from 'react'

class ConnectingComponent extends React.Component {
    render() {
        if (!this.props.gameStateReducer.gameState === 'lobby') {
            return null;
        }

        if (!this.props.connectionStateReducer.connected) {
            return <div>Connecting...</div>;
        }

        if (this.props.roomConnectionReducer.connectionState === 'connecting') {
            return <div>
                Connecting to room {this.props.roomConnectionReducer.roomCode}
            </div>
        }

        return null;
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ConnectingComponent);