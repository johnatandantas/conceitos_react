import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      url: 'https://github.com/Rocketseat/umbriel',
      title: `Umbriel ${Date.now()}`,
      techs: ['Node', 'Express', 'TypeScript'],
    };

    api.post('/repositories', newRepository).then((response) => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const array = [...repositories];
      const removeIndex = array.map((repository) => repository.id).indexOf(id);
      array.splice(removeIndex, 1);
      setRepositories(array);
    });
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
