import React, { useState } from 'react';

const InputField = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(url);
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleChange} placeholder="Enter URL" />
      <button onClick={handleSubmit}>Show Default Views</button>
    </div>
  );
};

export default InputField;
