'use client';
import { Button, Input } from 'shared/index';
import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { Variable } from '../types';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { RootState } from 'app/providers/StoreProvider/config/store';

export const VariablesTab: React.FC = () => {
  const [storagedVars, setStoragedVars] = useLocalStorage<Variable[] | []>({
    key: 'variables',
    defaultValue: [],
  });
  const { variables } = useSelector((state: RootState) => state.apiRequest);
  const dispatch = useDispatch();
  const { setVariables } = apiRequestActions;

  useEffect(() => {
    setStoragedVars(variables);
  }, [variables]);

  useEffect(() => {
    !storagedVars
      ? setStoragedVars([{ key: '', value: '' }])
      : dispatch(setVariables({ variables: storagedVars }));
  }, []);

  const addVariable = () => {
    dispatch(
      setVariables({ variables: [...variables, { key: '', value: '' }] })
    );
  };

  const removeVariable = (idx: number) => {
    if(variables && variables.length === 1){
      dispatch(setVariables({ variables: [{key:'', value:''}] }));
      return
    }
    const newVariables = variables.filter((_, i) => i !== idx);
    dispatch(setVariables({ variables: newVariables }));
  };

  const updateVariable = (idx: number, key: string, value: string) => {
    const newVariables = [...variables];
    newVariables[idx] = { key, value };
    dispatch(setVariables({ variables: newVariables }));
  };

  return (
    <div className={styles["restful-wrapper_tabview-container__tab-wrapper"]}>
       <div className={styles['restful-wrapper_tabview-container_query-button']}>
        <Button title={<><span className="mr-2">+</span><span>{'Add'}</span></>} onClick={addVariable} />
      </div>
      {variables.map((variable, idx) => (
        <div
          key={idx}
          className={styles['restful-wrapper_tabview-container_query']}
        >
          <Input
            id={idx.toString()}
            type="text"
            value={variable.key}
            onChange={(e) =>
              updateVariable(idx, e.target.value, variable.value)
            }
            placeholder="Key"
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={variable.value}
            onChange={(e) => updateVariable(idx, variable.key, e.target.value)}
            placeholder="Value"
          />
          <Button color="red" title={'Remove'} onClick={() => removeVariable(idx)} />
        </div>
      ))}
    </div>
  );
};

VariablesTab.displayName = 'VariablesTab';
