import mysql from "mysql2/promise";
import { env } from "../../env.js";

const connection = await mysql.createConnection({
  host: env.DB.HOST,
  port: env.DB.PORT,
  user: env.DB.USER,
  password: env.DB.PASSWORD,
  multipleStatements: true,
});
const connectDb = async (connection) => {
  await connection.connect();
  console.log("Connected to the database successfully.");

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS library_management_system;`,
  );
  await connection.query("USE library_management_system;");

  await connection.query(
    "CREATE TABLE IF NOT EXISTS books (book_id     INT AUTO_INCREMENT PRIMARY KEY,  title       VARCHAR(255) NOT NULL,  author      VARCHAR(100),  publisher   VARCHAR(100),  year        YEAR,  copies      INT DEFAULT 1 CHECK (copies >= 0));",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS members (card_number CHAR(12) PRIMARY KEY,full_name   VARCHAR(150) NOT NULL,email       VARCHAR(100),phone       VARCHAR(20),dob         DATE,active      TINYINT(1) DEFAULT 1 CHECK (active IN (0,1)));",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS borrow (  borrow_id      INT AUTO_INCREMENT PRIMARY KEY,  book_id      INT NOT NULL,  card_number  CHAR(12) NOT NULL,  borrow_date    DATE DEFAULT (CURRENT_DATE),  due_date     DATE,  returned_on  DATE,  FOREIGN KEY (book_id) REFERENCES books(book_id)    ON UPDATE CASCADE ON DELETE CASCADE,  FOREIGN KEY (card_number) REFERENCES members(card_number)    ON UPDATE CASCADE ON DELETE CASCADE);",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS books_deleted (   book_id     INT ,   title       VARCHAR(255) ,   author      VARCHAR(100),   publisher   VARCHAR(100),   year        YEAR,   copies      INT ,   deleted_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP );",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS members_deleted (  card_number CHAR(12) ,  full_name   VARCHAR(150) ,  email       VARCHAR(100),  phone       VARCHAR(20),  dob         DATE,  active      TINYINT(1) DEFAULT 1 CHECK (active IN (0,1)),  deleted_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS borrow_deleted (   borrow_id      INT ,   book_id      INT  ,   card_number  CHAR(12) ,   borrow_date    DATE DEFAULT (CURRENT_DATE),   due_date     DATE,   returned_on  DATE,   deleted_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP );",
  );

  const triggerSQL = `
DROP TRIGGER IF EXISTS trg_books_after_delete;
DROP TRIGGER IF EXISTS trg_members_after_delete;
DROP TRIGGER IF EXISTS trg_borrow_after_delete;

    CREATE TRIGGER trg_books_after_delete
AFTER DELETE ON books
FOR EACH ROW
BEGIN
  INSERT INTO books_deleted
          (book_id, title, author, publisher, year, copies, deleted_at)
  VALUES  (OLD.book_id, OLD.title, OLD.author, OLD.publisher,
           OLD.year, OLD.copies, NOW());
END;
   CREATE TRIGGER trg_members_after_delete
AFTER DELETE ON members
FOR EACH ROW
BEGIN
  INSERT INTO members_deleted
          (card_number, full_name, email, phone, dob, active, deleted_at)
  VALUES  (OLD.card_number, OLD.full_name, OLD.email, OLD.phone,
           OLD.dob, OLD.active, NOW());
END;
CREATE TRIGGER trg_borrow_after_delete
AFTER DELETE ON borrow
FOR EACH ROW
BEGIN
  INSERT INTO borrow_deleted
          (borrow__id, book_id, card_number,
           borrow_date, due_date, returned_on, deleted_at)
  VALUES  (OLD.borrow__id, OLD.book_id, OLD.card_number,
           OLD.borrow_date, OLD.due_date, OLD.returned_on, NOW());
END;
  `;

  await connection.query(triggerSQL);

  const procedureSql = `
  
CREATE PROCEDURE IF NOT EXISTS GetBooksByAuthor(IN authorName VARCHAR(100))
BEGIN
  SELECT * FROM books WHERE author = authorName;
END`;

  await connection.query(procedureSql);

  await connection.query(
    "CREATE OR REPLACE VIEW borrow_summary AS SELECT   b.title,   m.full_name,   br.borrow_date,   br.due_date,   br.returned_on FROM borrow br JOIN books b ON br.book_id = b.book_id JOIN members m ON br.card_number = m.card_number;",
  );
};

export { connection, connectDb };
