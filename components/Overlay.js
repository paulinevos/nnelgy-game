import React from 'react';

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
  }

  this.state = {
    visible: true,
  }

  render () {
    return (
      <React.Fragment>
        <Television />
      </React.Fragment>
    )
  }
}