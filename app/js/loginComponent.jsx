export default class LoginComponent extends React.Component {
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
    }

    render() {
        return <form onSubmit={this.handleSubmit} class="pure-form pure-form-aligned">
            <fieldset>
                <div class="pure-control-group">
                    <label for="roomCodeInput">Room Code</label>
                    <input id="roomCodeInput" type="text" maxlength="4" value={this.state.roomCode} onChange={this.handleRoomCodeChange} autocomplete="off" required/>
                </div>

                <div class="pure-control-group">
                    <label for="playerNameInput">Player Name</label>
                    <input id="playerNameInput" type="text" maxlength="16" value={this.state.playerName} onChange={this.handlePlayerNameChange} required/>
                    <span class="pure-form-message-inline">Characters remaining: {this.state.charactersRemaining}</span>
                </div>

                <div class="pure-controls">
                    <button type="submit" class="pure-button pure-button-primary" onSubmit={this.handleSubmit}>Submit</button>
                </div>
            </fieldset>
        </form>;
    }
}