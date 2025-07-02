import express from "express";
import csvRouter from "./routes/csv";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", csvRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
