import React from 'react';
import { Card } from 'semantic-ui-react'

class Counter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addOne = this.addOne.bind(this);
    this.state = {
      count: 0
    }
  }

  addOne() {
    this.setState((preState) => {
      return {
        count: preState.count + 1
      };
    });
  }

  render(name) {
    return (
      <div>
        <h2>Antal: {this.state.count}</h2>
        <button onClick={this.addOne}>+1</button>
      </div>
    );
  }
}

let names = ['Gabriel', 'Axel', 'Emil', 'Emma', 'Jakob', 'Josefine', 'Alma', 'Samuel', 'Teo', 'Vini', 'William', 'Ylva', 'Emma-US']

function renderPlayers() {
  return names.map((player) => {
    return (
      <Card key={player}>
        <Card.Content>
          <Card.Header>{player}</Card.Header>
          <Counter></Counter>
        </Card.Content>
      </Card>
    )
  });
}

const CardWithPlayers = () => (
  <Card.Group centered>
    {renderPlayers()}
  </Card.Group>
)

export default CardWithPlayers;
