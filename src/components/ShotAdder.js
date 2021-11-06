import React, { useState} from 'react';
import { Form, Grid, Button, Message } from 'semantic-ui-react'

const ShotAdder = ({ players }) => {
    const [personalName, setName] = useState('')
    const [reason, setReason] = useState('')
    const [currentId, setId] = useState(0)
    const [lastName, setLastName] = useState('')
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
            value: player.name
        }))
    }) 

    const onSubmit = async e => {
        //e.preventDefault()
        await fetch(`http://localhost:5000/reasons`, {
            method: 'POST', 
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(
                {
                "id": currentId,
                "name": personalName,
                "description": reason
                }
            )
        })
        setLastName(personalName)
        setIsSuccessfullySubmitted(true)
        setName('')
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
                            value={personalName}
                            onChange={(e, data) => setName(personalName => personalName = data.value)}
                             />
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