import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma.ts';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import signUpRouter from './routes/signupRoute.js';

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

//Middleware
app.use(express.urlencoded({extended:true}))
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
    })
}));

//Routes
app.use('/',signUpRouter)

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log('server is running on port', PORT);
});