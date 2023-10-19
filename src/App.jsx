import React, { useCallback, useState } from 'react';
import { Button } from '@components';
import { Select } from './components';

function App() {
  const [value, setValue] = useState(1);

  const handleChange = useCallback((value)=> setValue(value) ,[])

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
      <Select options={[{label:'test1', value: 1},{label:'test2', value: 2},{label:'test3', value: 3}]} value={value} onChange={handleChange}/>
      <div>hi</div>
    </div>
  );
}

export default App;
