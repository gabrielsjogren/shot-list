import React, { useState } from 'react';
import { Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const AppHeader = () => {
  return (
  <Segment className="segment-header">
    <Header as='h1' textAlign='center' color='red'>
      Shot Lista
    </Header>
  </Segment>
)}

export default AppHeader;
