'use client';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { v4 } from 'uuid';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import Variable from './Variable';
import { Spinner } from 'shared/index';

export const VariablesList = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const [storagedVars] = useLocalStorage<{ key: string; value: string }[] | []>(
    {
      key: 'variables',
      defaultValue: [],
    }
  );

  if (!isAuthChecked) return null;
  if (!storagedVars) return <Spinner />;
  return (
    <AuthGuards requireAuth={true}>
      <table>
        <thead>
          <tr>
            <th scope="col">Variable</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {storagedVars &&
            storagedVars.map((variable) => (
              <tr key={v4()}>
                <Variable variable={variable} />
              </tr>
            ))}
        </tbody>
      </table>
    </AuthGuards>
  );
};

VariablesList.displayName = ' VariablesList';
