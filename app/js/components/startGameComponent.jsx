import { connect } from 'react-redux'
import React from 'react';
import { startGameEvent } from '../actions/actions.js'

class StartGameComponent extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.sendStartGameEvent();
    }

    render() {
        if (this.props.roomConnectionReducer.connectionState !== 'connected') {
            return null;
        }

        if (this.props.gameStateReducer.gameState === 'playing') {
            return null;
        }

        const disableButton = this.props.gameStateReducer.gameState === 'game_starting';

        return <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-aligned">
            <fieldset>
                <div className="pure-controls">
                    <button type="submit" className="pure-button pure-button-primary" onSubmit={this.handleSubmit.bind(this)} disabled={disableButton}>Start Game</button>
                </div>
            </fieldset>
        </form>;
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    sendStartGameEvent: (payload) => dispatch(startGameEvent(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartGameComponent);