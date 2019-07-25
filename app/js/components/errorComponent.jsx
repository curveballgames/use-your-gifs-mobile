import { connect } from 'react-redux'
import React from 'react';

class ErrorComponent extends React.Component {
    render() {
        if (this.props.errorReducer.errorMessage === null || this.props.errorReducer.errorMessage === '') {
            return null;
        }

        return <div>{this.props.errorReducer.errorMessage}</div>;
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(ErrorComponent);