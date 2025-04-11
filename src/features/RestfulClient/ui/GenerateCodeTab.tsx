import sdk from 'postman-collection';
import codegen from 'postman-code-generators';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store';
import styles from './styles.module.css'
import { replaceVariables } from 'shared/utils/help';
import { cGlangOptions } from 'shared/constants/codeGenerator';
import { Select } from 'shared/index';
import classNames from 'classnames';

export const GenerateCodeTab = () => {
  const [codeSnippet, setCodeSnippet] = useState<string>('');
    const [codegenError, setCodegenError] = useState<string>('');
    const [codegenParams, setCodegenParams] = useState({
      language: 'curl',
      framework: 'curl',
      label:'cUrl',
    });
    const [codeValue, setCodeValue] = useState<string>(cGlangOptions[0].value)
      const apiData = useSelector((state: RootState) => state.apiRequest);
      const { browserUrl, method, body, headers, variables, id } = apiData;

      useEffect(() => {
       const codeGenerator = async() => {
        setCodegenError('');
        try {
          const request = new sdk.Request({
            url: replaceVariables(browserUrl, variables),
            method,
            header: replaceVariables(headers, variables),
            body: ['POST', 'PUT', 'PATCH'].includes(method)
              ? {
                  mode: 'raw',
                  raw: replaceVariables(body, variables),
                }
              : undefined,
          });

          codegen.convert(codegenParams.language, codegenParams.framework, request, {}, (err: Error | null, snippet: string) => {
            if (err) {
              setCodegenError('Code generation failed.');
              console.error(err);
            } else {
             setCodeSnippet(snippet);
            }
          });
        } catch (e) {
          console.error(e);
          setCodegenError('Something went wrong.');
        }
       }

      if(codegenParams.language !== '') codeGenerator()
      },[codegenParams, id])

      const handleLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = evt.target.value;
        setCodeValue(selectedValue);
      
        const selected = JSON.parse(selectedValue);
        setCodegenParams({
          language: selected.language,
          framework: selected.framework,
          label: selected.label
        });
      };
      return(
         <>
         <Select
          width={210}
          id="language-select"
          value={codeValue}
          onChange={(evt) => handleLanguageChange(evt)}
          options={cGlangOptions}
         />
       {codegenError && <p style={{ color: 'red' }}>{codegenError}</p>}
       <pre className={classNames(styles['restful-wrapper_tabview-container_code'])}>
         {codeSnippet}
       </pre>
       </>
      )
  };

  GenerateCodeTab.displayName = 'GenerateCodeTab';