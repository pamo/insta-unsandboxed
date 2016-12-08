import React from 'react';
const toSecureUrl = (url) => (url.replace(/^http/, 'https'));
const Photo = (props) => (<div className="instagram-photo">
    <h3>{props.title}</h3>
    <h4>{props.location.city}</h4>
    <a href={props.link} target="_blank" rel="noreferrer noopener"><img src={toSecureUrl(props.src)} alt={props.title} /></a>
    </div>);

export default Photo;
