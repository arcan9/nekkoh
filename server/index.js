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

app.get('/api/posts/:postId', uploadsMiddleware, (req, res, next) => {
  const { postId } = req.params;
  const sql = `
    select *
      from "posts"
     where "postId" = $1
  `;
  const values = [postId];

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

app.get('/api/comments/', (req, res, next) => {
  const sql = `
    SELECT
    u."username",
    c."createdAt",
    c."userId",
      "comment",
      "commentId",
    p."postId"
    FROM "comments" as c
    JOIN "appUsers" as u using ("userId")
    JOIN "posts" as p using ("postId")
  `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/comments/:postId', (req, res, next) => {
  const { text } = req.body;
  const { postId } = req.params;
  const userId = 1;

  if (!text) {
    throw new ClientError(400, 'text is a required field');
  }

  const sql = `
    INSERT INTO "comments"
    ("comment", "userId", "postId")
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [text, userId, postId];
  db.query(sql, values)
    .then(commentResult => {
      const [comment] = commentResult.rows;

      const userSql = `
        SELECT "username" from "appUsers"
        WHERE "userId" = $1
      `;
      const userParams = [userId];

      return db.query(userSql, userParams)
        .then(userResult => {
          const [user] = userResult.rows;
          comment.username = user.username;
          res.status(201).json(comment);
        });
    })
    .catch(err => next(err));
});

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

  if (typeof caption !== 'string') {
    res.status(400).json({
      error: 'caption (string) is a required field'
    });
    return;
  }

  let sql = `
    UPDATE "posts"
       SET "caption" = $1,
           "userId" = $2
     WHERE "postId" = $3
     RETURNING *
  `;
  let values = [caption, userId, postId];

  // if a new file is being uploaded, update the database with said file
  if (typeof req.file !== 'undefined') {
    const imgUrl = path.join('/images', req.file.filename);

    if (typeof imgUrl !== 'string') {
      res.status(400).json({
        error: 'imgUrl (string) is a required field'
      });
      return;
    }
    sql = `
    UPDATE "posts"
       SET "caption" = $1,
           "mediaFile" = $2,
           "userId" = $3
     WHERE "postId" = $4
     RETURNING *
  `;
    values = [caption, imgUrl, userId, postId];
  }

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

app.patch('/api/comments/:commentId', (req, res, next) => {
  const { text } = req.body;
  const { commentId } = req.params;
  const userId = 1;

  const sql = `
    UPDATE "comments"
      SET "comment" = $1,
          "userId" = $2
    WHERE "commentId" = $3
    RETURNING *
  `;
  const values = [text, userId, commentId];

  db.query(sql, values)
    .then(commentResult => {
      const [comment] = commentResult.rows;
      if (!comment) {
        throw new ClientError(400, `cannot find comment with the commentId ${commentId}`);
      }

      const userSql = `
        SELECT "username" from "appUsers"
        WHERE "userId" = $1
      `;
      const userParams = [userId];
      return db.query(userSql, userParams)
        .then(userResult => {
          const [user] = userResult.rows;
          comment.username = user.username;
          res.status(201).json(comment);
        });
    })
    .catch(err => next(err));
});

app.delete('/api/posts/:postId', (req, res, next) => {
  const { postId } = req.params;
  const sql = `
    DELETE FROM "posts"
          WHERE "postId" = $1
  `;
  const values = [postId];

  db.query(sql, values)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.delete('/api/comments/:commentId', (req, res, next) => {
  const { commentId } = req.params;
  const sql = `
    DELETE FROM "comments"
      WHERE "commentId" = $1
  `;
  const values = [commentId];

  db.query(sql, values)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.get('/api/posts/', (req, res, next) => {
  // const { userId } = req.params;
  const sql = `
    select
      u."username",
      u."userId",
      "postId",
      "mediaFile",
      "caption",
    p."createdAt"
    from "posts" as p
    inner join "appUsers" as u using("userId")
  `;
  // const values = [userId];
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
