import React, { useState } from 'react';
import { Button } from '@components';

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
      <Button size="small" width="100px">
        Test1
      </Button>
      <Button width="200px">Test2</Button>
      <Button size="large">Test3</Button>
      <Button size="small" width="100px" buttonType="outlined">
        Test1
      </Button>
      <Button width="200px" buttonType="outlined">
        Test2
      </Button>
      <Button size="large" buttonType="outlined">
        Test3
      </Button>
    </div>
  );
}

export default App;
