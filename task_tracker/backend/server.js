import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.routes.js";
import focusRoutes from "./routes/focus.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/focus", focusRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
