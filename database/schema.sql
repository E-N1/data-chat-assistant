-- Extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


--GRANT CONNECT ON DATABASE localAssistant TO localAssistant;
--CREATE ROLE IF NOT EXISTS data_chat_assistant WITH LOGIN PASSWORD '1234567890';

--GRANT CONNECT ON DATABASE localAssistant TO data_chat_assistant;
--GRANT USAGE ON SCHEMA public TO data_chat_assistant;
--GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO data_chat_assistant;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO data_chat_assistant;

ALTER ROLE data_chat_assistant CREATEDB;

-- Function to auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chats_updated_at
BEFORE UPDATE ON chats
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- CHATS
CREATE TABLE IF NOT EXISTS chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    metadata JSONB,
    role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- MEMORIES
CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fact TEXT NOT NULL,
    type TEXT,
    importance INTEGER CHECK (importance BETWEEN 1 AND 10),
    created_at TIMESTAMP DEFAULT NOW(),
    embedding VECTOR(1536) -- For OpenAI Embeddings
);

-- KNOWLEDGE BASE
CREATE TABLE IF NOT EXISTS knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT,
    source TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TOPICS
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT
);

-- RELATION: KNOWLEDGE_BASE <-> TOPICS (Many-to-Many)
CREATE TABLE IF NOT EXISTS knowledge_topics (
    knowledge_id UUID REFERENCES knowledge_base(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (knowledge_id, topic_id)
);

-- VECTOR STORE
CREATE TABLE IF NOT EXISTS vector_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knowledge_id UUID REFERENCES knowledge_base(id) ON DELETE CASCADE,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT NOW()
);

-- TASKS
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')),
    priority INTEGER CHECK (priority BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Embeddings
CREATE TABLE IF NOT EXISTS embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_table TEXT NOT NULL, -- "memories" oder "knowledge_base"
    source_id UUID NOT NULL,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT NOW()
);

-- LOGS / AUDIT
CREATE TABLE IF NOT EXISTS logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL, -- e.G. "message_sent", "memory_updated"
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);


--Relationships to chats for memories
--If you want a memory to be directly traceable to a chat situation:
ALTER TABLE memories
ADD COLUMN message_id UUID REFERENCES messages(id) ON DELETE SET NULL;

-- Indexes für Performance bei Suche für Embeddings:
CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Für Volltextsuche:
ALTER TABLE knowledge_base ADD COLUMN tsv tsvector;
CREATE INDEX idx_knowledge_tsv ON knowledge_base USING GIN(tsv);

--updated_at automated set
-- So you don't have to think about it in every query
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_chats_timestamp
BEFORE UPDATE ON chats
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();


-- First Chat
INSERT INTO chats (id, title, created_at, updated_at)
VALUES (gen_random_uuid(), 'My first Chat', NOW(), NOW());
ON CONFLICT DO NOTHING;


