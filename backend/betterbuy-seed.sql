DROP DATABASE IF EXISTS betterbuy;
CREATE DATABASE betterbuy;
\connect betterbuy

\i betterbuy-schema.sql

DROP DATABASE IF EXISTS betterbuy_test;
CREATE DATABASE betterbuy_test;
\connect betterbuy_test

\i betterbuy-schema.sql