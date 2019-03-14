import React from 'react';

class Navbar extends React.Component {
  render (){
    return (
      <nav className="navbar" >
      {this.props.heading}
      </nav>
    );
  }
}

export default Navbar;
