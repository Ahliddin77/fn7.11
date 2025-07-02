declare module "csv-parser" {
  interface CsvParserOptions {
    separator?: string;
    headers?: boolean | string[];
    skipLines?: number;
    strict?: boolean;
  }

  type CsvParser = (options?: CsvParserOptions) => NodeJS.ReadWriteStream;

  const csvParser: CsvParser;

  export = csvParser;
}
