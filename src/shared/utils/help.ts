import { Variable } from "features/RestfulClient/types";

export const replaceVariables = (template:string, variables:Variable[]) => {
    return template.replace(/\{\{(.*?)\}\}/g, (_, variableName) => {
      const variableObj = variables.find(varObj => varObj.key === variableName)
      return variableObj ? variableObj.value : template.toString()
    });
  }
