const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://awwdjptnkhqero:ecaa929e501c53b57dc9ee62b5c25b32e7b018ad957f1a1d71fa43c3bc6efd80@ec2-23-23-164-128.compute-1.amazonaws.com:5432/dl7ae9k9q3c17",
  ssl: true,
});

client.connect();
console.log(client.status);

/* client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
}); */
