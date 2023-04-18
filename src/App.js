import React, { useState } from 'react';
import Form from './components/input.jsx';

function App() {
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(false);

  const handleClick = () => {
    fetch('https://wgohphvw18.execute-api.us-east-1.amazonaws.com/default/petFetch')
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data.body);
        setData(parsedData);
        setShowData(true);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      {!showData && <Form />}
      <button onClick={handleClick}>See photos</button>
      {showData && data && data.Items && (
        <ul>
          {data.Items.map(item => (
            <li key={item.uid}>{item.pet} - {item.type} - {item.message} - {item.fileName} </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;