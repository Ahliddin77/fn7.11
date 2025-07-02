export interface CsvRequestBody {
  data?: Record<string, any>[];
  csv?: string;
}

export interface CsvResponseBody {
  csv: string;
  data: Record<string, any>[];
}
