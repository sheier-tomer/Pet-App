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
    <form onSubmit={handleSubmit}>
      <label>
        petpetName:
        <input type="text" value={petName} onChange={(event) => setpetName(event.target.value)} />
      </label>
      <br />
      <label>
        petType:
        <input type="petType" value={petType} onChange={(event) => setpetType(event.target.value)} />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
