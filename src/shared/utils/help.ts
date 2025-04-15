import { VariableType } from 'features/RestfulClient/types';
import { Query } from 'shared/model/types';

export const replaceVariables = (
  template: string | Query[],
  variables: VariableType[]
) => {
  switch (typeof template) {
    case 'string': {
      return template.replace(/\{\{(.*?)\}\}/g, (_, variableName) => {
        const variableObj = variables.find(
          (varObj) => varObj.key === variableName
        );
        return variableObj ? variableObj.value : template.toString();
      });
    }
    case 'object': {
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
  }
};

export const setUrl = (url: URL, method: string, path: string): void => {
  url.pathname = `/${method}`;
  url.searchParams.set('link', path);
  window.history.pushState({}, '', url.toString());
};

export const buildUrl = (url: URL, method: string, path: string): string => {
  return `${url.protocol}//${url.host}/${method}/${path !== '' ? btoa(path) : path}`;
};

export const formatDateToString = (date: Date): string => {
  const yy = String(date.getFullYear()).slice(2); // ГГ
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // ММ (нумерация с 0)
  const dd = String(date.getDate()).padStart(2, '0'); // дд
  const hh = String(date.getHours()).padStart(2, '0'); // чч
  const mi = String(date.getMinutes()).padStart(2, '0'); // мм

  return `${yy}.${mm}.${dd} ${hh}.${mi}`;
};
