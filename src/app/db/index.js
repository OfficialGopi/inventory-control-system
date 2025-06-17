import mysql from "mysql2/promise";
import { env } from "../../env.js";

const connection = await mysql.createConnection({
  host: env.DB.HOST,
  port: env.DB.PORT,
  user: env.DB.USER,
  password: env.DB.PASSWORD,
  database: env.DB.NAME,
  multipleStatements: true,
});
const connectDb = async (connection) => {
  await connection.connect();
  console.log("Connected to the database successfully.");

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS INVENTORY_CONTROL_SYSTEM;",
  );
  await connection.query("USE INVENTORY_CONTROL_SYSTEM;");

  await connection.query(
    "CREATE TABLE IF NOT EXISTS suppliers (supplier_id INT PRIMARY KEY AUTO_INCREMENT,  name VARCHAR(100) NOT NULL,  contact_email VARCHAR(100) UNIQUE NOT NULL,phone VARCHAR(15));",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS products (  product_id INT PRIMARY KEY AUTO_INCREMENT,  name VARCHAR(100) NOT NULL,  category VARCHAR(50),  quantity INT DEFAULT 0,  price DECIMAL(10,2) NOT NULL,  supplier_id INT,  FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE);",
  );

  await connection.query(
    "CREATE TABLE IF NOT EXISTS inventory_logs (  log_id INT PRIMARY KEY AUTO_INCREMENT,  product_id INT,  change_type ENUM('INCREASE', 'DECREASE'),  change_qty INT,  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE);",
  );

  const triggerSQL = `
     DROP TRIGGER IF EXISTS after_product_update;
    DROP TRIGGER IF EXISTS after_product_insert;

    CREATE TRIGGER after_product_update
    AFTER UPDATE ON products
    FOR EACH ROW
    BEGIN
      IF OLD.quantity != NEW.quantity THEN
        INSERT INTO inventory_logs (product_id, change_type, change_qty)
        VALUES (
          NEW.product_id,
          IF(NEW.quantity > OLD.quantity, 'INCREASE', 'DECREASE'),
          ABS(NEW.quantity - OLD.quantity)
        );
      END IF;
    END;

    CREATE TRIGGER after_product_insert
    AFTER INSERT ON products
    FOR EACH ROW
    BEGIN
      INSERT INTO inventory_logs (product_id, change_type, change_qty)
      VALUES (
        NEW.product_id,
        'INCREASE',
        NEW.quantity
      );
    END;
  `;

  await connection.query(triggerSQL);
};

export { connection, connectDb };
