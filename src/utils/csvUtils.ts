import fs from "fs";
const csvParser = require("csv-parser");
import * as Papa from "papaparse";

export const parseCsvFile = (
  path: string
): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const results: Record<string, string>[] = [];

    fs.createReadStream(path)
      .pipe(csvParser())
      .on("data", (data: Record<string, string>) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err: Error) => {
        reject(err);
      });
  });
};

export const parseCsvString = (csv: string): Record<string, string>[] => {
  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data;
};

export const convertDataToCsv = (data: Record<string, any>[]): string => {
  return Papa.unparse(data);
};
