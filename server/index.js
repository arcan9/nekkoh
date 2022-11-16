require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

// app.get('/api/hello', (req, res) => {
//   res.json({ hello: 'world' });
// });

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  const { caption } = req.body;
  const userId = 1;
  if (!caption) {
    throw new ClientError(400, 'caption is a required field');
  }

  const imgUrl = path.join('/images', req.file.filename);

  const sql = `
    INSERT INTO "posts" ("caption", "mediaFile", "userId")
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [caption, imgUrl, userId];

  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/posts/:postId', uploadsMiddleware, (req, res, next) => {
  const { caption } = req.body;
  const { postId } = req.params;
  const userId = 1;
  const imgUrl = path.join('/images', req.file.filename);

  if (typeof caption !== 'string') {
    res.status(400).json({
      error: 'caption (string) is a required field'
    });
    return;
  }

  if (typeof imgUrl !== 'string') {
    res.status(400).json({
      error: 'imgUrl (string) is a required field'
    });
    return;
  }

  const sql = `
    UPDATE "posts"
       SET "caption" = $1,
           "mediaFile" = $2,
           "userId" = $3
     WHERE "postId" = $4
     RETURNING *
  `;
  const values = [caption, imgUrl, userId, postId];

  db.query(sql, values)
    .then(result => {
      const [post] = result.rows;
      if (!post) {
        res.status(404).json({
          error: `cannot find post with the postId ${postId}`
        });
        return;
      }
      res.json(post);
    })
    .catch(err => next(err));
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
    select *
      from "posts"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
