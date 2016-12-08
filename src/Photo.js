import React from 'react';
const toSecureUrl = (url) => (url.replace(/^http/, 'https'));
const srcSet = (defaultImage, images) => (`${defaultImage} 1x, ${images[1].url} 2x,
    ${images[0].url} 3x, ${images[0].url} 4x`);
const Photo = (props) => (<div className="instagram-photo">
    <h3>{props.title}</h3>
    <h4>{props.location.city}</h4>
    <a href={props.link} target="_blank" rel="noreferrer noopener">
    <img
    src={toSecureUrl(props.src)}
    srcSet={srcSet(props.src, props.images)}
    alt={props.title} /></a>
    </div>);

export default Photo;
