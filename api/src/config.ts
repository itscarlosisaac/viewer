import dotenv from 'dotenv';
dotenv.config({ path:"../.env" });

export const port = process.env.PORT || 8080;
export const rootUrl = `http://localhost:${port}/api`;