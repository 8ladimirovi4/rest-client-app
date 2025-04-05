import { Variable } from "features/RestfulClient/types";

export const replaceVariables = (template:string | Headers [], variables:Variable[]) => {
    switch (typeof template) {
        case 'string':
            return template.replace(/\{\{(.*?)\}\}/g, (_, variableName) => {
                const variableObj = variables.find(varObj => varObj.key === variableName)
                return variableObj ? variableObj.value : template.toString()
              });
        case 'object':
            const kek = template.map(templateObj => {
                const templateObjStr = JSON.stringify(templateObj)
                return templateObjStr.replace(/\{\{(.*?)\}\}/g, (_, variableName) => {
                   const variableObj = variables.find(varObj => varObj.key === variableName)
                   return variableObj ? variableObj.value : JSON.stringify(templateObj)
                 });
             })
             const kek2 = kek.map(el => JSON.parse(el))
             console.log('===> kek2', kek2)
              return kek2
        default:
            break;
    }
    
  }
