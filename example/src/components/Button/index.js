/*
  <Button />

  This file shows the pattern of calling csjs
  first with the styles, then using the `styles`
  object in the @decorator around a React class.

  In this particular case we use the `classes` prop
  provided by react-csjs but we could just as easily
  have used the `styles` object which is still in scope.
*/

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
    this.setState(prevState => ({
        clicks: prevState.clicks + 1
    }));
  }

  render() {
    /* could also use `styles` object which is still in scope */
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
