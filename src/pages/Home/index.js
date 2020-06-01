import React, { useState, useEffect } from 'react';

import { database } from '../../service/firebase';


import './style.css';

export default () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    skills: '',
  });

  const [candidates, setCandidates] = useState([]);

  const fetchCandidatesData = snapshot => {
    const candidatesData = [];
    snapshot.forEach(doc => candidatesData.push({ ...doc.data(), id: doc.id }));
    setCandidates(candidatesData);
  }

  useEffect(() => {
    return database.collection('candidates').onSnapshot(fetchCandidatesData);
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    database.collection('candidates').add(form)
    .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
        console.error('Error adding document: ', error);
    });

    setForm({
      name: '',
      email: '',
      skills: '',
    });
  }

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [key]: value,
    });
  }
  console.log(candidates);
  return (
    <>
      <h1>Insira os candidatos:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          value={form.name}
          onChange={handleChange} 
          type="text" name="name" id="name" placeholder="Digite seu nome"
        />
        <label htmlFor="email">Email</label>
        <input
          value={form.email}
          onChange={handleChange} 
          type="email" name="email" id="email" placeholder="Digite seu e-mail"
        />
        <label htmlFor="skills">Habilidades</label>
        <textarea 
          value={form.skills}
          onChange={handleChange}
          name="skills" id="" rows="5" placeholder="Javascript, React, Vue, Angular..."
        ></textarea>
        <button type="submit">Enviar</button>
      </form>

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
}