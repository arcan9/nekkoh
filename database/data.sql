INSERT INTO "appUsers" (
  "firstName",
  "lastName",
  "email",
  "hashPassword",
  "username"
  ) VALUES (
  'Jane',
  'Doe',
  'person@mail.com',
  '123',
  'JaneDoe'
  ), (
    'Jackson',
    'Galaxy',
    'person2@mail.com',
    '456',
    'jackson_galaxy'
  ), (
    'Bob',
    'Belcher',
    'person3@mail.com',
    '798',
    'bob_belcher'
  );


INSERT INTO "posts" (
  "caption",
  "mediaFile",
  "userId"
  ) VALUES (
    'lorem ipsum',
    '/images/kitten.jpg',
    1
  ), (
    'hmm good boi deserves the best',
    '/images/dog-with-bowl.jpg',
    2
  ), (
    'I think it is time for a siesta!',
    '/images/yawning-cat.jpg',
    3
  );

INSERT INTO "comments" (
  "userId",
  "postId",
  "comment"
) VALUES (
  2,
  1,
  'So cute!! Where can I get one? :)'
), (
  1,
  2,
  'that''s a hefty breakfast'
);
