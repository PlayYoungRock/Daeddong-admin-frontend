import React, { useState } from 'react';
import { Button } from '@components';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <Button size="large">test</Button>
        <Button size="large" disabled>
          test
        </Button>
        <Button>test</Button>
        <Button disabled>test</Button>
        <Button size="small">test</Button>
        <Button size="small" disabled>
          test
        </Button>
        <Button variant="error" size="large">
          test
        </Button>
        <Button variant="error" size="large" disabled>
          test
        </Button>
        <Button variant="error">test</Button>
        <Button variant="error" disabled>
          test
        </Button>
        <Button variant="error" size="small">
          test
        </Button>
        <Button variant="error" size="small" disabled>
          test
        </Button>
      </div>
      <div>
        <Button buttonType="outlined" size="large">
          test
        </Button>
        <Button buttonType="outlined" size="large" disabled>
          test
        </Button>
        <Button buttonType="outlined">test</Button>
        <Button buttonType="outlined" disabled>
          test
        </Button>
        <Button buttonType="outlined" size="small">
          test
        </Button>
        <Button buttonType="outlined" size="small" disabled>
          test
        </Button>
        <Button buttonType="outlined" variant="error" size="large">
          test
        </Button>
        <Button buttonType="outlined" variant="error" size="large" disabled>
          test
        </Button>
        <Button buttonType="outlined" variant="error">
          test
        </Button>
        <Button buttonType="outlined" variant="error" disabled>
          test
        </Button>
        <Button buttonType="outlined" variant="error" size="small">
          test
        </Button>
        <Button buttonType="outlined" variant="error" size="small" disabled>
          test
        </Button>
      </div>
    </div>
  );
}

export default App;
