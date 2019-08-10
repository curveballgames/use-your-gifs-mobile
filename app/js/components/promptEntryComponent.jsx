import { connect } from 'react-redux'
import { submitPrompt } from '../actions/actions'
import React from 'react';

class PromptEntryComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prompt: '',
            charactersRemaining: PromptEntryComponent.maxPromptLength
        };
    }

    static get maxPromptLength() {
        return 300;
    }

    handlePromptChange = (event) => {
      let prompt = event.target.value.trim().substring(0, PromptEntryComponent.maxPromptLength);

      this.setState({
            prompt,
            charactersRemaining: prompt.length - PromptEntryComponent.maxPromptLength
        });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();

      if (this.state.prompt.length === 0) {
        return;
      }

      this.props.submitPrompt({
          prompt: this.state.prompt
      })
    }

    render() {       
        if (this.props.gameStateReducer.gameState !== 'prompt_entry') {
            return null;
        }

        if (this.props.roomConnectionReducer.playerName === this.props.roomConnectionReducer.controllerName) {
            return <div>{this.props.roomConnectionReducer.controllerName} is coming up with something proper naughty!</div>
        } else {
            return <form onSubmit={this.handleSubmit} className="pure-form pure-form-aligned">
                <div>It's your turn to enter a prompt - do your worst!</div> 
                <fieldset>
                    <div className="pure-control-group">
                        <textarea name="promptEntry" maxLength={PromptEntryComponent.maxPromptLength} rows="20" cols="25" onChange={this.handlePromptChange}/>
                        <span className="pure-form-message-inline">Characters remaining: {this.state.charactersRemaining}</span>
                    </div>

                    <div className="pure-controls">
                        <button type="submit" className="pure-button pure-button-primary" onSubmit={this.handleSubmit}>Submit</button>
                    </div>
                </fieldset>
            </form>;
        }
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    submitPrompt: (payload) => dispatch(submitPrompt(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PromptEntryComponent);