import React, {Component} from 'react';
import csjs from 'csjs';
import withStyles from 'react-csjs';

const styles = csjs`
  .button {
    background-color: rgba(135, 206, 235, 0.8);
    border: 0;
    padding: 0.7em 1.5em;
    margin: 5px;
    font-size: 1.1em;
    border-radius: 10px;
    color: #fefefe;
    cursor: pointer;
  }

  .button:hover {
    background-color: rgba(135, 206, 235, 0.9);
  }
`;

@withStyles(styles)
export default class Button extends Component {
  state = {
    clicks: 0
  };

  handleClick = () => {
    console.log('clicked');
    // this.setState(prevState => ({
    //   clicks: prevState.clicks++
    // }));
    this.setState(prevState => ({
        clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <button
        className={this.props.classes.button}
        onClick={this.handleClick}
      >
        Clicked {this.state.clicks} time{this.state.clicks===1?'':'s'}
      </button>
    );
  }
};
