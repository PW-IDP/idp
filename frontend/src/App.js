import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authSettings } from './common/AuthSettings';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState("ACCESS_TOKEN")

  const getTokens = () => {
    getAccessTokenSilently().then((x) => {
      // console.log("getAccessTokenSilently", x)
      setAccessToken(x)
    }).catch((x) => {
      console.log("err", x)
    });

    // getIdTokenClaims().then((x) => {
    //   console.log("getIdTokenClaims", x.__raw)
    // }).catch((x) => {
    //   console.log("err", x)
    // }) ;
  }

  const publicEndpointTest = () => {
    const config = {
        method: 'GET',
        headers: { },
    };
    fetch('http://localhost:8080/api/public', config)
    .then(function (response) {
      console.log(response.status);
      response.json().then(function (body) {
          console.log(JSON.stringify(body));
      })
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
  }

  const privateEndpointTest = () => {
    const config = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
    };
    fetch('http://localhost:8080/api/private', config)
    .then(function (response) {
      console.log(response.status);
      response.json().then(function (body) {
          console.log(JSON.stringify(body));
      })
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
  }

  const privateScopedEndpointTest = () => {
    const config = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
    };
    fetch('http://localhost:8080/api/private-scoped', config)
    .then(function (response) {
      console.log(response.status);
      response.json().then(function (body) {
          console.log(JSON.stringify(body));
      })
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
  }


  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, lsoginWithRedirect]);


  // console.log(user)
  // user && console.log(user[authSettings.rolesKey])
  return (
    <div>
      <button onClick={getTokens}>Get Access Token</button>
      <div>
        <button onClick={publicEndpointTest}>public</button>
        <button onClick={privateEndpointTest}>private</button>
        <button onClick={privateScopedEndpointTest}>private-scoped</button>
      </div>
      {accessToken}
      <div>
      {
      isAuthenticated ? 
        <button onClick={() => {logout({ returnTo: window.location.origin })}}> Log Out</button>
        :
        <button onClick={loginWithRedirect}> Log In</button>
      }
      </div>
    </div>
  );
}

export default App;
