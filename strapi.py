#!/usr/bin/python
import requests
import json

endpoint = ""

batchInsert = ""

token = ""

headers = {
    'Content-Type': 'application/json',
}

tokenheaders = {
    'Content-Type': 'application/json',
    "Authorization": "Bearer "+ token,
}

json_data = {
    'data': [
    {
        'episode': '999',
        'title': 'uniswap',
        'author': 'zoq',
        'url': 'z.com',
        'time': '2024-06-20',
        'introduce': 'Smart WebP, PNG and JPEG compression',
        'editor': '1',

    },
    {
        'episode': '999',
        'title': 'zkp',
        'author': 'qiang',
        'url': 'g.com',
        'time': '2024-06-21',
        'introduce': 'How to Fetch Data in React: Cheat Sheet + Examples',
        'editor': '2',
    },
    {
        'episode': '999',
        'title': 'DAO',
        'author': 'wen',
        'url': 'c.com',
        'time': '2024-06-22',
        'introduce': 'Data on demand is something that you fetch after a user interacts with a page, in order to update their experience. All the various autocompletes, dynamic forms, and search experiences fall under that category. In React, fetch of this data is usually triggered in callbacks.',
        'editor': '3',
    }]
}

resp = requests.post(endpoint + batchInsert, headers=tokenheaders, json=json_data)

print(resp.text)
print()
