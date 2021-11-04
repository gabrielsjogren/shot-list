import React from 'react';
import { Input, Dropdown, Form, TextArea, Grid } from 'semantic-ui-react'

const ShotAdder = ({ players }) => {
    const names = []
    players.map((player) => {
        names.push({
            key: player.id,
            text: player.name,
            value: player.name
        })
    }) 

    return (
        <Grid centered >
                <Grid.Column width= {8}>
                    <Form >
                        <Form.Dropdown
                            placeholder='Välj syndare...'
                            selection
                            options={names} 
                             />
                        <Form.TextArea placeholder='Anledning till straffshot...'  />
                    </Form>
                </Grid.Column>
        </Grid>
    )
}

export default ShotAdder