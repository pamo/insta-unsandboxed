import Infinite from 'react-infinite';
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
      elementHeights: [],
      gridHeight: props.gridHeight
    };
  }
  componentDidMount(x,y,z){
    this.setState({
      gridHeight: window.innerHeight
    });
  }
  componentWillMount () {
    InstagramData.map((photoData, index) => {
      const key = `photo-${index}`;
      const photoSrc = findLast(photoData.images, image => (image.width >= 300));
      this.state.elementHeights.push(photoSrc.height);
      return this.state.photos.push(<Photo location={photoData.location} link={photoData.link} src={photoSrc.url} title={photoData.location.title} index={index} key={key} />);
    });
  }
  render() {
    return (<div className='App'>
        <div className='App-header'>
          <h2>Café Fronts</h2>
        </div>
        <Infinite
          elementHeight={this.state.elementHeights}
          containerHeight={this.state.gridHeight}
          className='scroll-container'
          useWindowAsScrollContainer>
        {this.state.photos}
        </Infinite>
        </div>);
  }
}

export default App;
