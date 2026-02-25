import React from 'react';

import PrimaryHeadline from './PrimaryHeadline'
import SecondaryHeadline from './SecondaryHeadline'
import Paragraph from './Paragraph'

// uses React Context to share the state
const ContextExample = () => (
  <div>
    <PrimaryHeadline>Hello React Context from ContextExample function</PrimaryHeadline>

    <Paragraph>
      That's how you use children in React by the way, also coming from ContextExample.
    </Paragraph>

    <SecondaryHeadline>
      With a React useContext Hook instead of Consumer component this
      time! Coming from ContextExample
    </SecondaryHeadline>
  </div>
);

export default ContextExample;