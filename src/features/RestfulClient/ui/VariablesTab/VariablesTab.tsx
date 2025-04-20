'use client';
import { Button, Input } from 'shared/index';
import React, { useEffect } from 'react';
import styles from '../styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { VariableType } from '../../types';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useTranslation } from 'react-i18next';

export const VariablesTab: React.FC = () => {
  const { t } = useTranslation();
  const [storagedVars, setStoragedVars] = useLocalStorage<VariableType[] | []>({
    key: 'variables',
    defaultValue: [{ key: '', value: '' }],
  });
  const { variables } = useSelector((state: RootState) => state.apiRequest);
  const dispatch = useDispatch();
  const { setVariables } = apiRequestActions;

  useEffect(() => {
    setStoragedVars(variables);
  }, [variables]);

  useEffect(() => {
    if (storagedVars) {
      dispatch(setVariables({ variables: storagedVars }));
    }
  }, []);

  const addVariable = () => {
    dispatch(
      setVariables({ variables: [...variables, { key: '', value: '' }] })
    );
  };

  const removeVariable = (idx: number) => {
    if (variables && variables.length === 1) {
      dispatch(setVariables({ variables: [{ key: '', value: '' }] }));
      return;
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
    <div className={styles['restful-wrapper_tabview-container__tab-wrapper']}>
      <div className={styles['restful-wrapper_tabview-container_query-button']}>
        <Button
          color="primary"
          title={
            <>
              <img src="/icon/add.svg" alt="Check Icon" className="h-6 w-6" />
              <span>{t('Buttons.Add')}</span>
            </>
          }
          onClick={addVariable}
        />
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
            placeholder={t('Placeholders.Key')}
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={variable.value}
            onChange={(e) => updateVariable(idx, variable.key, e.target.value)}
            placeholder={t('Placeholders.Value')}
          />
          <Button
            color="primary"
            title={
              <>
                <img
                  src="/icon/delete.svg"
                  alt="Check Icon"
                  className="h-6 w-6"
                />
                <span>{t('Buttons.Remove')}</span>
              </>
            }
            onClick={() => removeVariable(idx)}
          />
        </div>
      ))}
    </div>
  );
};

VariablesTab.displayName = 'VariablesTab';
