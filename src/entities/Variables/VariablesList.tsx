'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import Variable from './Variable';
import { Button, Spinner } from 'shared/index';
import { useEffect } from 'react';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import styles from './styles.module.css'

export const VariablesList = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const { variables } = useSelector((state: RootState) => state.apiRequest);
  const [storagedVars, setStoragedVars] = useLocalStorage<{ key: string; value: string }[] | []>(
    {
      key: 'variables',
      defaultValue: [],
    }
  );
  const dispatch = useDispatch()
  
  const { setVariables } = apiRequestActions;

  const updateVariable = (idx: number, key: string, value: string): void =>{
    const newVariables = [...variables];
    newVariables[idx] = { key, value };
    dispatch(setVariables({ variables: newVariables }));
  } 

  const removeVariable = (idx: number): void =>{
    const newVariables = variables.filter((_,i) => i !== idx);
    dispatch(setVariables({ variables: newVariables }));
  } 

  const removeVariables = ():void => {
    dispatch(setVariables({ variables: [{key:'', value:''}] }));
  } 

   useEffect(() => {
      !storagedVars
        ? setStoragedVars([{ key: '', value: '' }])
        : dispatch(setVariables({ variables: storagedVars }));
    }, []);

    useEffect(() => {
        setStoragedVars(variables);
      }, [variables]);

  if (!isAuthChecked) return null;
  if (!storagedVars) return <Spinner />;
  return (
    <AuthGuards requireAuth={true}>
  <div className={styles["var-list-wrapper"]}>
    <div className={styles["var-list-wrapper__button"]}>
    <Button title="Clear All" color="red" onClick={removeVariables}/>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Key
                </th>
                <th scope="col" className="px-6 py-3">
                   Value
                </th>
                <th scope="col" className="px-6 py-3">
                  
                </th>
                <th scope="col" className="px-6 py-3">
                
                </th>
            </tr>
        </thead>
        <tbody>
        {variables.map((variable, idx) => (
    <Variable  key={idx} variable={variable} updateVariable={updateVariable} removeVariable={removeVariable} id={idx}/>
))}
        </tbody>
    </table>
    </div>
    </AuthGuards>
  );
};

VariablesList.displayName = ' VariablesList';


