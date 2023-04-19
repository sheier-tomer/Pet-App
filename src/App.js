import React, { useState } from 'react';
import Form from './components/input.jsx';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import { Auth } from "aws-amplify";

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

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
      return (
        <Authenticator>
          {({ signOut, user }) => (
              <div>
                <p>Welcome {user.username}</p>
                <button onClick={signOut}>Sign out</button>
              </div>
          )}
        </Authenticator>
    );
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