declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  interface ConvertOptions {
    indentType?: string;
    indentCount?: number;
    includeBoilerplate?: boolean;
    short?: boolean;
  }

  type ConvertCallback = (error: Error | null, snippet: string) => void;

  const codegen: {
    convert: (
      language: string,
      variant: string,
      request: Request,
      options: ConvertOptions,
      callback: ConvertCallback
    ) => void;
  };

  export default codegen;
}
