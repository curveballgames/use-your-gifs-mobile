import { connect } from 'react-redux'
import { clearError } from '../actions/actions.js'
import React from 'react';

class ErrorComponent extends React.Component {
    render() {
        if (this.props.errorReducer.errorMessage === null || this.props.errorReducer.errorMessage === '') {
            return null;
        }

        setTimeout(() => { this.props.clearError(); }, 5000);
        return <div>{this.props.errorReducer.errorMessage}</div>;
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(clearError())
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);