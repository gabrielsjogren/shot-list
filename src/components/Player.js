import React from 'react';
import { Card } from 'semantic-ui-react'

const Player = ({ player, updateShotList }) => {
    return (
        <Card key={player.id}>
            <Card.Content>
                <Card.Header>{player.name}</Card.Header>
                <div>
                    <h2>Antal: {player.shots}</h2>
                    <button onClick={() => {
                        player.shots += 1
                        console.log(player.shots)
                        updateShotList(player)
                        }}>+1</button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default Player;