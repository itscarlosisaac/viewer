// import dotenv from 'dotenv';
// dotenv.config({ path:"../.env" });

export const port = process.env.REACT_APP_PORT || 4001;
console.log(`object`, process.env)
export const rootUrl = `http://localhost:${port}/api/list`;