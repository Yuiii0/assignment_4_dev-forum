import { Client } from "pg";

const client = new Client({
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

export default client;
