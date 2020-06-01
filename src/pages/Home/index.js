import React, { useState, useEffect } from 'react';

import { database } from '../../service/firebase';

import CandidateList from '../../components/CandidateList/index';


import './style.css';

export default () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    skills: '',
  });

  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = () => {
    database.collection('candidates').onSnapshot(snapshot => {
      const candidatesData = snapshot.docs.map(doc => (
        {
          ...doc.data(),
          id: doc.id
        })
      );
      setCandidates(candidatesData);
    });
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    database.collection('candidates').add(form)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);

        return docRef.update({
          id: docRef.id
        });
      })
      .then(function() {
        console.log('ID updated')
      })
      .catch(function (error) {
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

      <CandidateList candidates={candidates} />
    </>
  )
}