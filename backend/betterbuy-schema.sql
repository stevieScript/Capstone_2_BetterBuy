CREATE TABLE users (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    "password" TEXT NOT NULL
);
