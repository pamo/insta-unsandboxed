import InfiniteGrid from 'react-infinite-grid';
import React, { Component } from 'react';
import findLast from 'lodash.findlast';
import './App.css';
import Photo from './Photo.js';
import InstagramData from '../tmp/results.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      gridHeight: props.gridHeight
    };
  }
  componentDidMount(x,y,z){
    this.setState({
      gridHeight:`${window.innerHeight}px`
    });
  }
  componentWillMount () {
    InstagramData.map((photoData, index) => {
      const key = `photo-${index}`;
      const photoSrc = findLast(photoData.images, image => (image.width >= 300));
      return this.state.photos.push(<Photo src={photoSrc.url} title={photoData.location.title} index={index} key={key} />);
    });
  }
  render() {
    return (<div className='App'>
        <div className='App-header'>
          <h2>Café Fronts</h2>
        </div>
        <InfiniteGrid
          padding={0}
          buffer={0}
          wrapperHeight={this.state.gridHeight}
          entries={this.state.photos}
        />
        </div>);
  }
}

export default App;
