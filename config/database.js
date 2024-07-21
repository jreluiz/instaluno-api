// Cria e popula a base com alguns usuários, fotos, comentários e likes

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCAHR(255) NOT NULL,
    user_profile_photo_url TEXT DEFAULT (''), 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'senac', '123456', 'https://raw.githubusercontent.com/jreluiz/instasenac-api/main/uploads/senac.png' 
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'senac')
`;

const INSERT_DEFAULT_USER_2 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'dog', '123456', 'https://www.imagemhost.com.br/images/2023/11/04/Cachorro8ffe5c0ccebc5257.jpg' 
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'dog')
`;

const PHOTO_SCHEMA = `
CREATE TABLE IF NOT EXISTS photo (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    photo_post_date TIMESTAMP DEFAULT current_timestamp, 
    photo_url TEXT DEFAULT (''), 
    photo_description TEXT DEFAULT ('') NOT NULL, 
    photo_allow_comments INTEGER NOT NULL DEFAULT (1), 
    photo_likes BIGINT NOT NULL DEFAULT (0),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

const INSERT_DEFAULT_PHOTO_1 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)
SELECT 1,datetime('2024-07-21 15:10:50'),'https://www.imagemhost.com.br/images/2023/11/04/Leao.jpg', 'Linda imagem!',1 
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 1)
`;

const INSERT_DEFAULT_PHOTO_2 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)
SELECT 2,datetime('2024-07-20 15:00:50'),'https://www.imagemhost.com.br/images/2023/11/04/India.jpg','Top demais!',1
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 2)
`;

const INSERT_DEFAULT_PHOTO_3 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)
SELECT 3,datetime('2024-07-19 15:00:50'),'https://www.imagemhost.com.br/images/2023/11/04/Carro-Esportivo.jpg','Que nave!!!',1
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 3)
`;

const INSERT_DEFAULT_PHOTO_4 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 4,datetime('2024-07-18 15:00:50'),'https://www.imagemhost.com.br/images/2023/11/04/Astronauta.jpg','Lembrei da música o astronauta de mármore, to velho kkkk',2
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 4)
`;

const INSERT_DEFAULT_PHOTO_5 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 5,datetime('2024-07-18 15:05:50'),'https://www.imagemhost.com.br/images/2023/11/04/Lua.jpg','Que lua!!!',2
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 5)
`;

const INSERT_DEFAULT_PHOTO_6 = `
INSERT INTO photo (
    photo_id,
    photo_post_date,
    photo_url,
    photo_description,
    user_id
)

SELECT 6,datetime('2024-07-17 13:05:50'),'https://www.imagemhost.com.br/images/2023/11/04/Alem-da-sua-Imaginacao.jpg','Foto perfeita',2
WHERE NOT EXISTS (SELECT * FROM photo WHERE photo_id = 6)
`;

const COMMENT_SCHEMA = `
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP DEFAULT current_timestamp,
    comment_text TEXT  DEFAULT (''),
    photo_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const INSERT_COMENTS_1 = `
INSERT INTO comment (
    comment_text,
    user_id,
    photo_id
)
SELECT "Muito bom!!",1, 1
WHERE NOT EXISTS (SELECT * FROM comment WHERE user_id = 2)
`;

const INSERT_COMENTS_2 = `
INSERT INTO comment (
    comment_text,
    user_id,
    photo_id
)
SELECT "Parabéns aos envolvidos!!",2, 1
WHERE NOT EXISTS (SELECT * FROM comment WHERE user_id = 3)
`;
const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    photo_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, photo_id),
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

const INSERT_LIKE = `
INSERT INTO like (
    photo_id,
    user_id
)
SELECT 1,1
WHERE NOT EXISTS (SELECT * FROM like WHERE photo_id= 1 and user_id = 1)
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  db.run(INSERT_DEFAULT_USER_1);
  db.run(INSERT_DEFAULT_USER_2);
  db.run(PHOTO_SCHEMA);
  db.run(INSERT_DEFAULT_PHOTO_1);
  db.run(INSERT_DEFAULT_PHOTO_2);
  db.run(INSERT_DEFAULT_PHOTO_3);
  db.run(INSERT_DEFAULT_PHOTO_4);
  db.run(INSERT_DEFAULT_PHOTO_5);
  db.run(INSERT_DEFAULT_PHOTO_6);
  db.run(COMMENT_SCHEMA);
  db.run(INSERT_COMENTS_1);
  db.run(INSERT_COMENTS_2);
  db.run(LIKE_SCHEMA);
  db.run(INSERT_LIKE, err =>
    err ? console.log(err) : console.log("Base criada e populada com sucesso!")
  );
});

process.on("SIGINT", () =>
  db.close(() => {
    console.log("Database closed");
    process.exit(0);
  })
);

module.exports = db;
