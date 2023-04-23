import React, { useState } from 'react';
import Form from './components/input.jsx';
import axios from 'axios';

const API_ENDPOINT = "https://crx7wfl54d.execute-api.us-east-1.amazonaws.com/default/get-presigned-url";


function App() {
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(false);
  const [images, setImages] = useState([]);

  const handleClick = () => {
    fetch('https://wgohphvw18.execute-api.us-east-1.amazonaws.com/default/petFetch')
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data.body);
        setData(parsedData);
        setShowData(true);
        console.log(data);

        fetchImagesFromS3();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    
  }


  const fetchImagesFromS3 = async () => {
    try {
      const imagesResponse = await axios({
        method: "GET",
        url: API_ENDPOINT,
        params: { fetchImages: true }
      });
      
      setImages(imagesResponse.data);
    } catch (error) {
      console.error(error);
      console.log("Fetching images from S3 failed");
      return null;
    }
  };


  return (
    <div>
      {!showData && <Form />}
      <button onClick={handleClick}>See photos</button>
      {showData && data && data.Items && (
  <ul>
    {data.Items.map((item, index) => (
      <li key={item.uid}>
        {item.pet} - {item.type} - {item.message} - {item.fileName} 
        {images.images && images.images[index] && (
          <img src={images.images[index]} alt={`Pet Image ${index}`} />
        )}
      </li>
    ))}
  </ul>
)}

      
    </div>
  );
}

export default App;