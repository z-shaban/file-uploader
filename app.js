import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma.ts';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();

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

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log('server is running on port', PORT);
});