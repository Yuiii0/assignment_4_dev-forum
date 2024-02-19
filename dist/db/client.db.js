"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: "aws-0-ap-northeast-2.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.eczuwoyixnnkxugpxbzb",
    password: "udemywkddbwl",
});
client.connect();
// .then(async () => {
//   console.log((await client.query("SELECT * FROM posts")).rows);
// });
exports.default = client;
