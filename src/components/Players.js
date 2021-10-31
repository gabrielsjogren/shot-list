import React from 'react';
import Player from './Player';

const Players = ({players, updateShotList }) => {
    return (
        <>
            {players.map((player) => (
                <Player
                    key={player.id}
                    player={player}
                    updateShotList={updateShotList}
                />
            ))}
        </>
    )
}

export default Players;