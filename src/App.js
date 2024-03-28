import React, { useState } from 'react';
import InputField from './InputField';
import Preview from './Preview';

function App() {
  const [metaTags, setMetaTags] = useState(null);

  const handleUrlSubmit = async (url) => {
    try {
      // Fetch meta tags from the provided URL
      const response = await fetchMetaTags(url);
      setMetaTags(response);
    } catch (error) {
      console.error('Error fetching meta tags:', error);
    }
  };

  const fetchMetaTags = async (url) => {
    try {
      // Make a GET request to the URL
      const response = await fetch(url);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }
      
      // Parse the HTML content from the response
      const html = await response.text();
      
      // Use DOMParser to create a DOM document from the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract metadata elements from the document
      const title = doc.querySelector('title').textContent.trim();
      const description = doc.querySelector('meta[name="description"]').getAttribute('content').trim();
      const imgurl = doc.querySelector('meta[property="og:image"]').getAttribute('content').trim();
      const mainurl = response.url;
      // Add more metadata elements as needed
      
      // Return the extracted metadata
      return { title, description,imgurl,mainurl };
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }
  };
  return (
    <div className="App">
      <h1>Meta Tag Preview</h1>
      <InputField onSubmit={handleUrlSubmit} />
      {metaTags && <Preview metaTags={metaTags} />}
    </div>
  );
}

export default App;
