import React, { useState} from 'react';
import { Form, Grid, Button, Message } from 'semantic-ui-react'

const ShotAdder = ({ players, fetchId, updateShotList }) => {
    const [currentPerson, setPerson] = useState([])
    const [reason, setReason] = useState('')
    const [currentId] = useState(0)
    const [lastName, setLastName] = useState('')
    const [nbrOfShots, setShots] = useState(0)
    const [
        isSuccessfullySubmitted,
        setIsSuccessfullySubmitted,
      ] = useState(false);

    const names = []
    players.map((player) => {
        return (
        names.push({
            key: player.id,
            text: player.name,
            value: player.id
        }))
    })

    const onChange = async (e, data) => {
        const person = await fetchId(data.value)
        setPerson(person)
    }

    const onSubmit = async e => {
        //e.preventDefault()
        const today = new Date(Date.now())
        await fetch(`http://localhost:5000/reasons`, {
            method: 'POST', 
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                "id": currentId,
                "name": currentPerson.name,
                "nbrOfShots": nbrOfShots,
                "date": today.toLocaleTimeString() + ", " + today.toLocaleDateString(),
                "description": reason
                }
            )
        })
        updateShotList(currentPerson, nbrOfShots)
        setLastName(currentPerson.name)
        setIsSuccessfullySubmitted(true)
        setReason('')
        }

    return (
        <Grid centered >
                <Grid.Column width= {8}>
                    <Form onSubmit={onSubmit} success>
                        <Form.Dropdown
                            placeholder='Välj syndare...'
                            selection
                            options={names}
                            onChange={onChange} />
                        <Form.Input 
                            type='number' 
                            placeholder='Antal shots...'
                            value={nbrOfShots}
                            onChange={(e) => setShots(e.target.value)}  ></Form.Input>
                        <Form.TextArea
                            placeholder='Anledning till straffshot...'
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}  />
                        {isSuccessfullySubmitted && (<Message
                            success
                            header='Tack rapporterare'
                            content={lastName + ' kommer nu att straffas' } /> )}
                        <Button type='submit' >Lägg till</Button>
                    </Form>
                </Grid.Column>
        </Grid>
    )
}

export default ShotAdder