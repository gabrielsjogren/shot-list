import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppHeader from './components/Header';
import { Card, Header } from 'semantic-ui-react'
import Players from './components/Players';
import ShotAdder from './components/ShotAdder';
import ShowReasons from './components/ShowReasons';

import './App.css';

const App = () => {
  const [players, setPlayers] = useState([])
  const [shots, setShots] = useState([])
  const [resaons, setReasons] = useState([])
 
  useEffect(() => {
    const getPlayers = async () => {
      const playersFromServer = await fetchPlayers()
      const reasonsFromServer = await fetchReasons()
      setPlayers(playersFromServer)
      setShots(playersFromServer.shots)
      setReasons(reasonsFromServer)
    }

    getPlayers()
  }, [shots])

  const fetchPlayers = async () => {
    const res = await fetch('http://localhost:5000/players')
    const data = await res.json()

    return data
  }

  const fetchReasons = async () => {
    const res = await fetch('http://localhost:5000/reasons')
    const data = await res.json()

    return data
  }

  const fetchId = async (id) => {
    const res = await fetch(`http://localhost:5000/players/${id}`)
    const data = await res.json()

    return data
  }

  const updateShotViaButton = async(player) => {
    const shotToUpdate = await fetchId(player.id)
    const updateShot = {...shotToUpdate, shots: player.shots }

    await fetch(`http://localhost:5000/players/${player.id}`, {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateShot)
    })
    setShots(updateShot)
  }

  const updateShotViaForm = async(player, nbrOfShots) => {
    const shotToUpdate = await fetchId(player.id)
    const updateShot = {...shotToUpdate, shots: Number(player.shots) + Number(nbrOfShots) }

    await fetch(`http://localhost:5000/players/${player.id}`, {
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateShot)
    })
    setShots(updateShot)
  }

  return (
    <Router>
      <AppHeader />
      <Route path='/' exact render={(props) => (
        <div>
          <Header textAlign='center'>
          <Link to='/add-shot' >
            Lägg till shot
          </Link>
          </Header>
          <Card.Group centered >
            {players.length > 0 ? 
              (<Players players={players} updateShotList={updateShotViaButton} />
              ) : (
                'No players right now'
              )}
          </Card.Group >
        </div>
      )} />
      <Route path='/add-shot' exact render={(props) => (
        <div>
          <Header textAlign='center'>
          <Link to='/' >
            Tillbaka
          </Link>
          </Header>
          <div>
            <ShotAdder players={players} fetchId={fetchId} updateShotList={updateShotViaForm} />
              <Card.Group centered>
                <ShowReasons reasons={ resaons }></ShowReasons>
              </Card.Group>
          </div>
        </div>
      )} />
          
    </Router>
  );
}

export default App;
