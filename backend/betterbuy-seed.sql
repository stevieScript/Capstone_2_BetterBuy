DROP DATABASE IF EXISTS betterbuy;
CREATE DATABASE betterbuy;
\connect betterbuy
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
\i betterbuy-schema.sql

DROP DATABASE IF EXISTS betterbuy_test;
CREATE DATABASE betterbuy_test;
\connect betterbuy_test
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
\i betterbuy-schema.sql