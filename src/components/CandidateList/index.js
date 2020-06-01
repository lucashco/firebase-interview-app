import React from 'react';

import './style.css';

export default ({candidates}) => (
  <>
  <h2>Lista de Candidatos:</h2>
  <ul>
    {'Loading...' && candidates.map(candidate => (
      <li key={candidate.id}>
        <h4><strong>Nome: </strong>{candidate.name}</h4>
        <p><strong>E-mail: </strong>{candidate.email}</p>
        <p><strong>Habilidades: </strong>{candidate.skills}</p>
      </li>
    ))}
  </ul>
  </>
)