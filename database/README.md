## Database struktur:
Chats (1)───(N) Messages
Memories (eigenständig)
KnowledgeBase (N)───(N) Topics
KnowledgeBase (1)───(N) VectorStore
Tasks (eigenständig)
Logs/Audit (eigenständig)

UUID = UUID = Universally Unique Identifier
for example: 550e8400-e29b-41d4-a716-446655440000

## Semantic analysis:
Using the OpenAI API (or a local NLP model like spaCy), you can convert the message into facts:

Example:
“My dog's name is Bruno” → 8 (high)
“I'm cold right now” → 2 (low, only temporary)

### Storage decision
Rule:
importance >= 5 → store in memories table.
importance < 5 → ignore or leave in temporary chat logs.

### Retrieval in chat
If the user later asks:
“What breed is my dog?”
→ vector search + full-text search → returns the entry “Labrador.”