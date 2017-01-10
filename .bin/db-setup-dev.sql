-- create the schema
CREATE SCHEMA `cloudyday`;
-- create the user
CREATE USER 'cloudyday'@'localhost' IDENTIFIED BY 'cloudyday';
-- grant all privileges to the user
GRANT ALL ON `cloudyday` . * TO 'cloudyday'@'localhost';
