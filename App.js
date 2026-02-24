import React, {useEffect, useState} from "react";
import api from "./services/api";
import './App.css';

export default function App() {
  const [username, setUsername] = useState('Rayane-Fonseca');
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoanding] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
      async function loadData(){
        try{
          setLoanding(true);
          setError(null);

          const userResponse = await api.get('/users/${userToSearch}');
          setUser(userResponse.data);

          const reposResponse = await api.get('/users/${usersToSearch}/repos?per_page=6&sort=update');
          setUser(reposResponse.data);

        }catch(error){
          console.error('Erro', error);
          setError('Usuário ${userToSearch} não encontrado');

        }finally{
          setLoanding(false);
        }
        loadData();
      }
    }, []);

    if(loading){
      return(
        <div className="loanding-container">
          <div className="spinner"></div>
          <p>Carregando perfil...</p>
        </div>
      );
    }

    if(error || !user){
      return(
        <div className="error-container">
          <h2>❌{error}</h2>
          <button onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      )
    }

    return(
      <div className="app-container">
        <div className="profile-card"></div>
      </div>
    );
};