import React, { useState, useEffect } from 'react';
import Form from './components/input.jsx';
import axios from 'axios';
import './App.css';

const API_ENDPOINT = "https://crx7wfl54d.execute-api.us-east-1.amazonaws.com/default/get-presigned-url";

function App() {
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImagesFromS3();
  }, []);

  const handleClick = () => {
    fetch('https://wgohphvw18.execute-api.us-east-1.amazonaws.com/default/petFetch')
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data.body);
        setData(parsedData.Items);
        setShowData(true);
        console.log(data);
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
      
      setImages(imagesResponse.data.images);
    } catch (error) {
      console.error(error);
      console.log("Fetching images from S3 failed");
      return null;
    }
  };

  const itemsWithImages = data && images ? data.map((item, index) => {
    return {
      data: item,
      imageUrl: images[index]
    };
  }) : [];

  const handleBackClick = () => {
    window.location.reload();
  };

  return (
    
    <div>
      <h2 className="page-title">Welcome to The Pet Gazette</h2>
      {!showData && <Form />}
      <button className="see-photos-button" onClick={handleClick}>See photos</button>
      <button className="see-photos-button" onClick={handleBackClick}>Back</button>
      {showData && (
        <div>
          <ul>
            {itemsWithImages.map(({ data, imageUrl }) => (
              <li key={data.uid}>
                {data.pet} - {data.type} - {data.message}
                {imageUrl && <img src={imageUrl} alt={`Pet Image`} />}
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;