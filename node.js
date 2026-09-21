curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "model": "gpt-5.6-luna",
    "input": "write a haiku about ai",
    "store": true
  }'
