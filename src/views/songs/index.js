import React, {Component} from 'react';
import './index.css';
import SongTable from '../../components/songtable';

class Songs extends Component {
  constructor( props ) {
    super();

    this.state = {
      'song_list': [],
      }

    props.toggleHeader(3);
  }

  getBillboardList = async() => {

    let URL = 'http://127.0.0.1:5000/api/retrieve';
    let response = await fetch(URL);
    let data = await response.json();
    data = data.Success
    //set the state for the data
    this.setState({ 'song_list': data })
    console.log(data);

  }

  componentDidMount() {
    this.getBillboardList();
  }

  render() {
  return (
    <div className="songs">
      <h1>Top 100 Billboard List:</h1>
      <SongTable num={this.state.num} song_list={this.state.song_list}/>
    </div>
  );
}
}

export default Songs;
