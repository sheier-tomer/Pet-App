import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
function Form() {
  const [petName, setpetName] = useState('');
  const [petType, setpetType] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  const API_ENDPOINT = "https://crx7wfl54d.execute-api.us-east-1.amazonaws.com/default/get-presigned-url";

  const handleSubmit = async (event) => {
    event.preventDefault();
    let uidnum = Math.floor(Math.random() * 10000);
    uidnum = uidnum.toString();
  
    console.log(`petName: ${petName}, petType: ${petType}, Comment: ${comment}, file: ${file.name}`);
    
    try {
      // GET request: presigned URL
      const response = await axios({
        method: "GET",
        url: API_ENDPOINT,
        params: { filename: file.name }
      });
  
      // PUT request: upload file to S3
      await fetch(response.data.uploadURL, {
        method: "PUT",
        body: file,
      });

      // Post data to serverless function
      await axios.post('https://84ilpny30g.execute-api.us-east-1.amazonaws.com/default/petSeverlessAppFunction', { name: petName, uid: uidnum, type: petType, message: comment, fileName: file.name } )
      console.log("Info sent to db")
      
      // Reset form
      setpetName('');
      setpetType('');
      setComment('');
      setFile(null);


      // GET request: fetch all images in S3 bucket
      const imagesResponse = await axios({
        method: "GET",
        url: API_ENDPOINT,
        params: { fetchImages: true }
      });

      // Update images state with fetched images
      setImages(imagesResponse.data);
      console.log("Images fetched from S3:", imagesResponse.data.images);
      

    } catch (error) {
      console.error(error);
      console.log("Upload failed");

    }
  }




  const handleImageUpload  = (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  return (
    <div className="form-container">
    <h1>Post your pet!</h1>
    <form onSubmit={handleSubmit} >
      <div className="form-input">
        <label htmlFor="petName">petName:</label>
        <input type="text" id="petName" name="petName" value={petName} onChange={(event) => setpetName(event.target.value)} required />
      </div>
      <div className="form-input">
        <label htmlFor="petType">petType:</label>
        <input type="petType" id="petType" name="petType" value={petType} onChange={(event) => setpetType(event.target.value)} required />
      </div>
      <div className="form-input">
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" name="comment" value={comment} onChange={(event) => setComment(event.target.value)} rows="5" required></textarea>
      </div>
      <div className="form-input">
        <label htmlFor="petImage">Pet Image:</label>
        <input type="file" id="petImage" name="petImage" onChange={(event) => handleImageUpload(event)} required />
      </div>
      <button type="submit" className="submit-form">Submit</button>
    </form>


  </div>
  
  
  );
}

setTimeout(() => {
    document.querySelector('.form-container').style.opacity = '1';
  }, 100);

export default Form;
