import './App.css';
import { Login } from './Login';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import { Player } from './Component/Player';

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) setToken(_token);

    console.log("token", token);
  }, []);

  return (
    <div className="App">
      {
        token 
        ? <Player token={token} />
        : <Login /> 
      }
    </div>
  );
}

export default App;

/*
{
        token 
        ? <Player token={token} />
        : <Login /> 
      }
*/
