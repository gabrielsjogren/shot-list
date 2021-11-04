import React, { useState, useEffect } from 'react';
// Don't need routing right now.
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppHeader from './components/Header';
import { Card } from 'semantic-ui-react'
import Players from './components/Players';
import ShotAdder from './components/ShotAdder';

import './App.css';

const App = () => {
  const [players, setPlayers] = useState([])
  const [shots, setShots] = useState([])

  useEffect(() => {
    const getPlayers = async () => {
      const playersFromServer = await fetchPlayers()
      setPlayers(playersFromServer)
      setShots(playersFromServer.shots)
    }

    getPlayers()
  }, [shots])

  const fetchPlayers = async () => {
    const res = await fetch('http://localhost:5000/players')
    const data = await res.json()

    return data
  }

  const fetchId = async (id) => {
    const res = await fetch(`http://localhost:5000/players/${id}`)
    const data = await res.json()

    return data
  }

  const updateShotList = async(player) => {
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

  return (
    <div>
      <AppHeader />
      <div className="container">
          <Card.Group centered >
            {players.length > 0 ? 
              (<Players players={players} updateShotList={updateShotList} />
              ) : (
                'No players right now'
              )}
          </Card.Group>
          <ShotAdder players={players} />
      </div>
    </div>
  );
}

export default App;
