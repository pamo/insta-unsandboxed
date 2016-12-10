import Infinite from 'react-infinite';
import React, { Component } from 'react';
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
      gridHeight: window.innerHeight
    });
  }
  componentWillMount () {
    InstagramData.map((photoData, index) => {
      const key = `photo-${index}`;
      const deconstructCaption = (caption) => (caption.split('.'));
      return this.state.photos.push(<Photo location={photoData.location} link={photoData.link} title={photoData.location.title} images={photoData.images} caption={deconstructCaption(photoData.caption)} index={index} key={key} />);
    });
  }
  render() {
    return (<div className='App'>
        <div className='App-header'>
          <h2>Café Fronts</h2>
          <p>A <a href="https://likescoffee.com/cafe-fronts-photo-project" target="_blank" rel="noopener noreferrer">pet photo project</a> by <a href="https://instagram.com/pmocampo" target="_blank" rel="noopener noreferrer">@pmocampo</a></p>
        </div>
        <Infinite
          elementHeight={400}
          containerHeight={this.state.gridHeight}
          className='scroll-container'
          useWindowAsScrollContainer>
        {this.state.photos}
        </Infinite>
        </div>);
  }
}

export default App;
