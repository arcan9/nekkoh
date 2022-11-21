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
    'Catt',
    'person3@mail.com',
    '798',
    'bob_catt'
  ), (
    'Kay',
    'Nine',
    'person4@mail.com',
    '101112',
    'kay_nine9'
  ), (
    'Catnip',
    'Catnip',
    'person5@mail.com',
    '161718',
    'catnip13'
  ), (
    'Sam',
    'French',
    'person6@mail.com',
    '192021',
    'frenchies4lyfe'
  );


INSERT INTO "posts" (
  "caption",
  "mediaFile",
  "userId"
  ) VALUES (
    'It''s her first time outside 😃',
    '/images/kitten.jpg',
    1
  ), (
    'hmm good boi deserves the best',
    '/images/dog-with-bowl.jpg',
    4
  ), (
    'caught the perfect moment 😁',
    '/images/hug_pexels-tehmasip-khan-6601811.jpg',
    3
  ), (
    'king of the household',
    '/images/candlelit_pexels-sami-aksu-14356302.jpg',
    2
  ), (
    'Up close and personal!',
    'images/nose_pexels-amal-santhosh-662417.jpg',
    4
  ), (
    'Vacation well spent with the best bud~',
    'images/gofetch_pexels-thirdman-9313623.jpg',
    1
  ), (
    'Can you be-leaf how cute I am?',
    'images/indy.jpg',
    5

  ), (
    'twinning :D',
    'images/frenchies_pexels-robyn-porter-13966092.jpg',
    6
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
), (
  3,
  1,
  'let him explore the whole yard. 😁'
), (
  3,
  2,
  'looks like he loves it!'
), (
  2,
  3,
  'How cute!'
), (
  4,
  8,
  'sometimes they just be staring'
), (
  3,
  8,
  'aw what''s the little one''s name?'
), (
  6,
  7,
  'Don''t stop~ Be-LEAF-ing~ 🎵'
), (
  4,
  7,
  'not the puns...'
), (
  1,
  7,
  'green is his color'
), (
  2,
  7,
  'so cute! 🤩'
);
