import React from 'react';

function Form() {
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
        <form>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name">Pet Name:</label>
            <input type="text" id="name" name="name" required style={{ 
              display: 'block', 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc' 
            }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="petType"> Pet Type:</label>
            <input type="petType" id="petType" name="petType" required style={{ 
              display: 'block', 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc' 
            }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" rows="5" required style={{ 
              display: 'block', 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc' 
            }}></textarea>
          </div>
          <div style={{ marginBottom: '10px' }}>
          <label htmlFor="petImage">Pet Image:</label>
          <input type="file" id="petImage" name="petImage" onChange={(event) => handleImageUpload(event)} required style={{ 
            display: 'block', 
            width: '100%', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc' 
          }} />
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
