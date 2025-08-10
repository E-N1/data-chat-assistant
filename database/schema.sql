-- Extensions
CREATE EXTENSION IF NOT EXISTS vector;

-- Username and Password
ALTER USER data_chat_assistant WITH PASSWORD '1234567890';

-- CHATS
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB,
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
CREATE TABLE knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT,
    source TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TOPICS
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT
);

-- RELATION: KNOWLEDGE_BASE <-> TOPICS (Many-to-Many)
CREATE TABLE knowledge_topics (
    knowledge_id UUID REFERENCES knowledge_base(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (knowledge_id, topic_id)
);

-- VECTOR STORE
CREATE TABLE vector_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knowledge_id UUID REFERENCES knowledge_base(id) ON DELETE CASCADE,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT NOW()
);

-- TASKS
CREATE TABLE tasks (
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
CREATE TABLE embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_table TEXT NOT NULL, -- "memories" oder "knowledge_base"
    source_id UUID NOT NULL,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT NOW()
);

-- LOGS / AUDIT
CREATE TABLE logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL, -- e.G. "message_sent", "memory_updated"
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);


-- Relations zu Chats für Memories
--Wenn du möchtest, dass eine Memory direkt auf eine Chat-Situation zurückgeführt werden kann:
ALTER TABLE memories
ADD COLUMN message_id UUID REFERENCES messages(id) ON DELETE SET NULL;

-- Indexes für Performance bei Suche für Embeddings:

CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Für Volltextsuche:
ALTER TABLE knowledge_base ADD COLUMN tsv tsvector;
CREATE INDEX idx_knowledge_tsv ON knowledge_base USING GIN(tsv);

--updated_at automatisch setzen
-- Damit du nicht in jeder Query dran denken musst:
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

