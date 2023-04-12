import React, { useState } from 'react';

function Form() {
  const [petName, setpetName] = useState('');
  const [petType, setpetType] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`petName: ${petName}, petType: ${petType}, Comment: ${comment}`);
    // You can replace the console.log statement with your own code to handle the form submission.
  }

  return (
    <div style={{ 
        maxWidth: '500px', 
        margin: '0 auto', 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '5px',
        opacity: '0',
        transition: 'opacity 0.5s ease-in-out'
      }} className="form-container">
      <h1>Post your pet!</h1>
      <form onSubmit={handleSubmit} >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="petName">petName:</label>
          <input type="text" id="petName" name="petName" value={petName} onChange={(event) => setpetName(event.target.value)} required style={{ 
            display: 'block', 
            width: '100%', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc' 
          }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="petType"> petType:</label>
          <input type="petType" id="petType" name="petType" value={petType} onChange={(event) => setpetType(event.target.value)} required style={{ 
            display: 'block', 
            width: '100%', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc' 
          }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={comment} onChange={(event) => setComment(event.target.value)} rows="5" required style={{ 
            display: 'block', 
            width: '100%', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc' 
          }}></textarea>
        </div>
        <button type="submit" style={{ 
          display: 'block', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}>Submit</button>
      </form>
    </div>
  );
}

setTimeout(() => {
    document.querySelector('.form-container').style.opacity = '1';
  }, 100);

export default Form;
