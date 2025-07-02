import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  parseCsvFile,
  parseCsvString,
  convertDataToCsv,
} from "../utils/csvUtils";
import { CsvRequestBody, CsvResponseBody } from "../types";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/csv",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      let csvString: string;
      let dataArray: Record<string, any>[];

      // CASE 1 - CSV file upload
      if (req.file) {
        const filePath = path.resolve(req.file.path);
        dataArray = await parseCsvFile(filePath);
        csvString = convertDataToCsv(dataArray);

        // clean up uploaded file
        fs.unlinkSync(filePath);

        const response: CsvResponseBody = { csv: csvString, data: dataArray };
        res.json(response);
      }

      const body = req.body as CsvRequestBody;

      // CASE 2 - JSON with csv string
      if (body.csv) {
        dataArray = parseCsvString(body.csv);
        csvString = body.csv;

        const response: CsvResponseBody = { csv: csvString, data: dataArray };
        res.json(response);
      }

      // CASE 3 - JSON with data array
      if (body.data) {
        dataArray = body.data;
        csvString = convertDataToCsv(dataArray);

        const response: CsvResponseBody = { csv: csvString, data: dataArray };
        res.json(response);
      }

      res.status(400).json({ error: "No valid data provided." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

export default router;
