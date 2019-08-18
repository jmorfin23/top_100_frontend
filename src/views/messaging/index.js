import React, {Component} from 'react';
import './index.css';
import Display from '../../components/display'
import Input from '../../components/input'


class Messaging extends Component {
  render() {
  return (
    <div className="messaging">
      <Display />
      <Input />
    </div>
  );
}
}

export default Messaging;
