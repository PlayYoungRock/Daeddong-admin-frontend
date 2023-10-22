import React, { useCallback, useState } from 'react';
import { Select, Button } from '@components';

function App() {
  const [value, setValue] = useState(1);

  const handleChange = useCallback((value) => setValue(value), []);

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
      <Select
        options={[
          { label: 'test1', value: 1 },
          { label: 'test2', value: 2 },
          { label: 'test3', value: 3 },
          { label: 'test4', value: 4 },
          { label: 'test5', value: 5 },
          { label: 'test6', value: 6 },
        ]}
        value={value}
        onChange={handleChange}
      />
      <div style={{ width: '100px' }}>
        <Button size="small">test1</Button>
        <Button>test2</Button>
        <Button size="large">test3</Button>
        <Button variant="error" size="small">
          test1
        </Button>
        <Button variant="error">test2</Button>
        <Button variant="error" size="large">
          test3
        </Button>
        <Button size="small" buttonType="outlined">
          test4
        </Button>
        <Button buttonType="outlined">test5</Button>
        <Button size="large" buttonType="outlined">
          test6
        </Button>
        <Button variant="error" size="small" buttonType="outlined">
          test4
        </Button>
        <Button variant="error" buttonType="outlined">
          test5
        </Button>
        <Button variant="error" size="large" buttonType="outlined">
          test6
        </Button>
      </div>
    </div>
  );
}

export default App;
