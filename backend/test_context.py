import httpx
import json

base_url = 'http://127.0.0.1:8000/api'

# Create a conversation
r = httpx.post(f'{base_url}/conversations')
conv_id = r.json()['id']

# Send message 1
r1 = httpx.post(f'{base_url}/chat', json={'conversation_id': conv_id, 'message': 'Hi, my favorite color is green and I live in Tokyo.'})
res1 = r1.json()['reply']

# Send message 2
r2 = httpx.post(f'{base_url}/chat', json={'conversation_id': conv_id, 'message': 'What is my favorite color and where do I live?'})
res2 = r2.json()['reply']

with open('test_results.txt', 'w', encoding='utf-8') as f:
    f.write(f'Reply 1: {res1}\n')
    f.write(f'Reply 2: {res2}\n')
