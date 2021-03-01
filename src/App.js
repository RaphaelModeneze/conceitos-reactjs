import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": `Umbriel ${Date.now()}`,
      "techs": ["Node", "Express", "TypeScript"]
    });

    const repo = repository.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`repositories/${id}`);

    if (result.status === 204) {
      setRepositories(repositories.filter(r => r.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep =>
          <li key={rep.id} >
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
