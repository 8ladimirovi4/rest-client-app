import { Variable } from 'features/RestfulClient/types';
import { Query } from 'shared/model/types';

export const replaceVariables = (
  template: string | Query[],
  variables: Variable[]
) => {
  switch (typeof template) {
    case 'string':
      return template.replace(/\{\{(.*?)\}\}/g, (_, variableName) => {
        const variableObj = variables.find(
          (varObj) => varObj.key === variableName
        );
        return variableObj ? variableObj.value : template.toString();
      });
    case 'object':
      const str = template.map((templateObj) => {
        const templateObjStr = JSON.stringify(templateObj);
        return templateObjStr.replace(/\{\{(.*?)\}\}/g, (_, variableName) => {
          const variableObj = variables.find(
            (varObj) => varObj.key === variableName
          );
          return variableObj ? variableObj.value : JSON.stringify(templateObj);
        });
      });
      return str.map((el) => JSON.parse(el));
  }
};

export const setUrl = (url: URL, method: string, path: string) => {
  url.pathname = `/${method}`;
  url.searchParams.set('link', path);
  window.history.pushState({}, '', url.toString());
};

export const buildUrl = (url: URL, method: string, path: string) => {
  return `${url.protocol}//${url.host}/${method}/?link=${path !== '' ? btoa(path) : path}`;
};
