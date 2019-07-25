import { connect } from 'react-redux'
import { connectToRoomAction } from '../actions/actions'
import React from 'react';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomCode: '',
            playerName: '',
            charactersRemaining: LoginComponent.maxNameLength
        };
    }

    static get maxNameLength() {
        return 16;
    }

    handleRoomCodeChange = (event) => {
      this.setState({
            roomCode: event.target.value.toUpperCase()
        });
    }

    handlePlayerNameChange = (event) => {
      this.setState({
          playerName: event.target.value,
          charactersRemaining: LoginComponent.maxNameLength - event.target.value.length
        });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();

      if (!/[A-Z]{4}/.test(this.state.roomCode)) {
        return;
      }

      if (this.state.playerName.length === 0) {
        return;
      }


      this.props.connectToRoom({
          roomCode: this.state.roomCode,
          playerName: this.state.playerName
      })
    }

    render() {
        if (!this.props.gameStateReducer.gameState === 'lobby') {
            return null;
        }

        if (!this.props.connectionStateReducer.connected || this.props.roomConnectionReducer.connectionState !== 'disconnected') {
            return null;
        }

        return <form onSubmit={this.handleSubmit} className="pure-form pure-form-aligned">
            <fieldset>
                <div className="pure-control-group">
                    <label htmlFor="roomCodeInput">Room Code</label>
                    <input id="roomCodeInput" type="text" maxLength="4" value={this.state.roomCode} onChange={this.handleRoomCodeChange} autoComplete="off" pattern="[A-Z]{4}" required/>
                </div>

                <div className="pure-control-group">
                    <label htmlFor="playerNameInput">Player Name</label>
                    <input id="playerNameInput" type="text" maxLength="16" value={this.state.playerName} onChange={this.handlePlayerNameChange} required/>
                    <span className="pure-form-message-inline">Characters remaining: {this.state.charactersRemaining}</span>
                </div>

                <div className="pure-controls">
                    <button type="submit" className="pure-button pure-button-primary" onSubmit={this.handleSubmit}>Submit</button>
                </div>
            </fieldset>
        </form>;
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    connectToRoom: (payload) => dispatch(connectToRoomAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);