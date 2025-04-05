'use client'
// dynamicVariables.js
import { useEffect, useState } from 'react';

localStorage.setItem('userVariables', JSON.stringify({ packageName: 'react' }));

const Variables = () => {
  const [variables, setVariables] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userVariables')) {
      setVariables(JSON.parse(localStorage.getItem('userVariables')));
    }
  }, []);

  return (
    <div>
      {variables ? (
        <pre>{JSON.stringify(variables, null, 2)}</pre>
      ) : (
        <p>Loading variables...</p>
      )}
    </div>
  );
};

export default Variables;
