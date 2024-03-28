import React from 'react';

const Preview = ({ metaTags }) => {
  return (
    <div>
      <h2>Meta Tag Previews</h2>
      <p>Title: {metaTags && metaTags.title}</p>
      <p>URL : {metaTags && metaTags.mainurl}</p>
      <img src={metaTags.imgurl} alt="OG Img"/>
      <p>Description: {metaTags && metaTags.description}</p>
    </div>
  );
};

export default Preview;
