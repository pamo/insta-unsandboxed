import React from 'react';
import findLast from 'lodash.findlast';

const toSecureUrl = (url) => (url.replace(/^http/, 'https'));
const srcSet = (images) => {
  const secureImageUrls = images.map(image => toSecureUrl(image.url));
  const defaultImage = toSecureUrl(findLast(images, image => (image.width >= 300)).url);
  return {
    fullSet: `${defaultImage} 1x, ${secureImageUrls[1]} 2x, ${secureImageUrls[0]} 3x, ${secureImageUrls[0]} 4x`,
    default: defaultImage
  };
};

const Photo = (props) => (<div className="instagram-photo">
    <h3>{props.title}</h3>
    <h4>{props.caption[1]}</h4>
    <a href={props.link} target="_blank" rel="noreferrer noopener">
    <img
    src={srcSet(props.images).default}
    srcSet={srcSet(props.images).fullSet}
    alt={props.title} /></a>
    <em>{props.caption[props.caption.length-2]}.</em>
    </div>);

export default Photo;
