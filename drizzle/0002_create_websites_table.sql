CREATE TABLE IF NOT EXISTS "websites" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "components" JSONB NOT NULL DEFAULT '[]',
  "published" BOOLEAN NOT NULL DEFAULT FALSE,
  "published_url" TEXT,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "websites_user_id_idx" ON "websites" ("user_id");