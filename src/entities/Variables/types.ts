export interface VariableProps {
  id: number
  variable: {
    key: string;
    value: string;
  };
  updateVariable: (id:number, key: string, value: string) => void;
  removeVariable: (id: number) => void;
}
