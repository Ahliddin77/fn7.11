declare module "papaparse" {
  export interface ParseResult<T> {
    data: T[];
    errors: any[];
    meta: any;
  }

  export interface ParseConfig<T> {
    header?: boolean;
    skipEmptyLines?: boolean;
  }

  export function parse<T>(
    csvString: string,
    config?: ParseConfig<T>
  ): ParseResult<T>;

  export function unparse(data: any): string;
}
