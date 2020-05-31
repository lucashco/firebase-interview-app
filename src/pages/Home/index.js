import React, { useState, useEffect } from 'react';

import { database } from '../../service/firebase';


import './style.css';

export default () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    skills: '',
  });

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const candidatesArray = [];
    database.collection('candidates').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const response = {
          name: doc.data().name,
          email: doc.data().email,
          skills: doc.data().skills,
        }
        candidatesArray.push(response);
      });

      setCandidates([...candidatesArray]);
    });
    
  }, []);

  console.log(candidates)
  
  const handleSubmit = (event) => {
    event.preventDefault();

    database.collection('candidates').add(form)
    .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
        console.error('Error adding document: ', error);
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

  return (
    <>
      <h1>Cadastre-se para entrevista.</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" id="name" placeholder="Digite seu nome"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Digite seu e-mail"
          onChange={handleChange}
        />
        <label htmlFor="skills">Habilidades</label>
        <textarea name="skills" id="" rows="5" placeholder="Javascript, React, Vue, Angular..."
          onChange={handleChange}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>

      <h2>Candidatos:</h2>
      <ul>
        {candidates.length && candidates.map(candidate => (
          <li key={candidate.email}>
            <h4><strong>Nome: </strong>{candidate.name}</h4>
            <p><strong>E-mail: </strong>{candidate.email}</p>
            <p><strong>Habilidades: </strong>{candidate.skills}</p>
          </li>
        ))}
      </ul>
    </>
  )
}