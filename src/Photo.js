import React from 'react';
const toSecureUrl = (url) => (url.replace(/^http/, 'https'));
const Photo = (props) => (<div className="instagram-photo"><img src={toSecureUrl(props.src)} alt={props.title} /></div>);

export default Photo;
