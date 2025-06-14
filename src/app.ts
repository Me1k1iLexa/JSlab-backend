import express from "express";
import cors from "cors";
import tasksRouter from './routes/tasks.route'
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route'

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

export default app;