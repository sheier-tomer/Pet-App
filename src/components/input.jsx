import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
function Form() {
  const [petName, setpetName] = useState('');
  const [petType, setpetType] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();


    let uidnum = Math.floor(Math.random() * 10000);
    uidnum = uidnum.toString();
  

    console.log(`petName: ${petName}, petType: ${petType}, Comment: ${comment}, file: ${file} `);
    //const { petName, petType, comment } = this.state;å
    // You can replace the console.log statement with your own code to handle the form submission.
    //works but diables cross origin in developr mode
    axios.post('https://84ilpny30g.execute-api.us-east-1.amazonaws.com/default/petSeverlessAppFunction', { name: petName, uid: uidnum, type:petType,  message: comment, fileName: file.name } )
      .then(response => {
        // Handle response
        console.log("info sent to db")
      })
      .catch(error => {
        // Handle error
        console.log("info did not send to db")
      });

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
