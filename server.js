const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();


const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://webx-assignment-frontend.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server is LIVE on port ${process.env.PORT}`)
  );
});
