'use client';
import { Button, Input } from 'shared/index';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { Variable } from '../types';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';

export const VariablesTab: React.FC = () => {
    const [storagedVars, setStoragedVars] = useLocalStorage<Variable[] | []>(
        {
          key: 'variables',
          defaultValue: [],
        }
      );
    const [variables, setVariables] = useState<Variable[] | []>(storagedVars || []);
    const dispatch = useDispatch();
    const { setVariables: setRequestVariables } = apiRequestActions;

  useEffect(() => {
    if (variables.length > 0) {
        setStoragedVars(variables)
    }
  }, [variables]);

   useEffect(() => {
      !storagedVars ? setStoragedVars([]) : dispatch(setRequestVariables({ variables: storagedVars }));;
    }, []);

  const addVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeVariable = (idx: number) => {
    const newVariables = variables.filter((_, i) => i !== idx);
    setVariables(newVariables);
  };

  const updateVariable = (idx: number, key: string, value: string) => {
    const newVariables = [...variables];
    newVariables[idx] = { key, value };
    setVariables(newVariables);
    dispatch(setRequestVariables({ variables: newVariables }));
  };

  return (
    <div>
      {variables.map((variable, idx) => (
        <div key={idx} className={styles['restful-wrapper_tabview-container_query']}>
          <Input
            id={idx.toString()}
            type="text"
            value={variable.key}
            onChange={(e) => updateVariable(idx, e.target.value, variable.value)}
            placeholder="Key"
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={variable.value}
            onChange={(e) => updateVariable(idx, variable.key, e.target.value)}
            placeholder="Value"
          />
          <Button title={'remove'} onClick={() => removeVariable(idx)} />
        </div>
      ))}
      <div className={styles['restful-wrapper_tabview-container_query-button']}>
        <Button width={120} title={'add variable'} onClick={addVariable} />
      </div>
    </div>
  );
};

VariablesTab.displayName = 'VariablesTab';
