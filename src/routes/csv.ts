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
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.file) {
        const filePath = path.resolve(req.file.path);
        const dataArray = await parseCsvFile(filePath);
        const csvString = convertDataToCsv(dataArray);

        fs.unlinkSync(filePath);

        res.json({ csv: csvString, data: dataArray });
        return;
      }

      const body = req.body as CsvRequestBody;

      if (body.csv) {
        const dataArray = parseCsvString(body.csv);
        res.json({ csv: body.csv, data: dataArray });
        return;
      }

      if (body.data) {
        const csvString = convertDataToCsv(body.data);
        res.json({ csv: csvString, data: body.data });
        return;
      }

      res.status(400).json({ error: "No valid data provided." });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

export default router;
