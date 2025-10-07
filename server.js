import express from "express";
import "dotenv/config";
import whatsappRoutes from "./routes/whatsapp.js";

const app = express();
app.use(express.json());

app.use("/", whatsappRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
