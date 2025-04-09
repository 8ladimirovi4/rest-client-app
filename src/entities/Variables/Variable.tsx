'use client'
import React, { useState } from 'react';
import { VariableProps } from './types';
import { Input } from 'shared/ui/Input/Input';

const Variable = ({ variable, updateVariable, removeVariable, id }: VariableProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
  return (
    <>
       <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {variable.key}
                </th>
                <td className="px-6 py-4">
                  {!isEdit ?
                ( <p>{variable.value}</p>)
                :
                ( <Input
                   id={id.toString()}
                   type={'text'}
                   value={variable.value}
                   width={300}
                   height={40}
                   onChange={(evt) => {updateVariable(id, variable.key, evt.target.value)}}
                  />
                )}
                </td>
                <td className="px-6 py-4">
                    <a href="#" onClick={() => setIsEdit(prev => !prev)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{!isEdit ? 'Edit' : 'Done'}</a>
                </td>
                <td className="px-6 py-4">
                    <a href="#" onClick={() => removeVariable(id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                </td>
            </tr>
    </>
  );
};

export default Variable;
