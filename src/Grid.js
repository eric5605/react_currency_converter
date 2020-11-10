
import React from 'react';

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Currency Grid</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Grid;
