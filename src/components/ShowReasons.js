import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

const ShowReasons = ({ reasons }) => {
    return (
        <>
            {reasons.map((reason) => (
                <Card key={reason.id} >
                <Card.Content header={reason.name} textAlign="center" />
                <Card.Content meta={reason.date} />
                <Card.Content description={reason.description} textAlign="center" />
                <Card.Content extra textAlign="center" >
                <Icon name='glass martini' />
                {reason.nbrOfShots + (reason.nbrOfShots === '1' ? " shot" : " shots")}
                <Icon name='glass martini' />
                </Card.Content>
            </Card>
            ))}
        </>
    )
}

export default ShowReasons