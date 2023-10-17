import React, { useState } from 'react';
import { Button } from '@components';
import { Select } from './components';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Select />
      
    </div>
  );
}

export default App;
