declare module 'postman-code-generators' {
  import { Request } from 'postman-collection';

  type SupportedLanguage =
    | 'curl'
    | 'fetch'
    | 'xhr'
    | 'axios'
    | 'requests'
    | 'okhttp'
    | 'restsharp'
    | 'native';

  interface ConvertOptions {
    indentType?: string;
    indentCount?: number;
    includeBoilerplate?: boolean;
    short?: boolean;
  }

  type ConvertCallback = (error: Error | null, snippet?: string) => void;

  function convert(
    language: string,
    variant: string,
    request: Request,
    options: ConvertOptions,
    callback: ConvertCallback
  ): void;

  const codegen: {
    convert: typeof convert;
  };

  export default codegen;
}
