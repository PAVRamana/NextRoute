curl --location 'https://point72-sb.api.identitynow.com/v3/search' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI5ZWNlYTRlZC1jZDhjLTQ4MzMtYmU2Ny04MTY3NDU0M2MyZDQiLCJwb2QiOiJzdGcwMy11c2Vhc3QxIiwic3Ryb25nX2F1dGhfc3VwcG9ydGVkIjpmYWxzZSwib3JnIjoicG9pbnQ3Mi1zYiIsImlkZW50aXR5X2lkIjoiNTMwYTVjYTM0YzM4NDJhMmEwYWFjYzNjOGJhYWVhMmMiLCJ1c2VyX25hbWUiOiJSYW5qYW4uRGFsYWkiLCJzY29wZSI6WyJCZz09Il0sInN0cm9uZ19hdXRoIjp0cnVlLCJleHAiOjE3MzY5OTM2NjEsImF1dGhvcml0aWVzIjpbIk9SR19BRE1JTiIsInNwOnVzZXIiXSwianRpIjoiUFBFaXhCcGh3bzRaVXpRaTc4eG9ZcXNFTUZvIiwiY2xpZW50X2lkIjoiZjg1ZjE1ODRhOWRmNGIyZTk3NjdlMzdhZGIxY2E1ODkifQ.huyNL-6E-ohpb_6VuanT1-ubLLGiwP3CDs0BUqxPFBc' \
--data '{
  "queryDsl": {
    "query_string": {
      "query": "attributes.interface:access-sunrise-sunset AND operation:REMOVE AND created:[now-1d/d TO now]"
    }
  },
  "indices": ["events"],
  "queryType": "DSL"
}
'
-----


curl --location 'https://point72-sb.api.identitynow.com/v3/search' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI5ZWNlYTRlZC1jZDhjLTQ4MzMtYmU2Ny04MTY3NDU0M2MyZDQiLCJwb2QiOiJzdGcwMy11c2Vhc3QxIiwic3Ryb25nX2F1dGhfc3VwcG9ydGVkIjpmYWxzZSwib3JnIjoicG9pbnQ3Mi1zYiIsImlkZW50aXR5X2lkIjoiNTMwYTVjYTM0YzM4NDJhMmEwYWFjYzNjOGJhYWVhMmMiLCJ1c2VyX25hbWUiOiJSYW5qYW4uRGFsYWkiLCJzY29wZSI6WyJCZz09Il0sInN0cm9uZ19hdXRoIjp0cnVlLCJleHAiOjE3MzY5OTM2NjEsImF1dGhvcml0aWVzIjpbIk9SR19BRE1JTiIsInNwOnVzZXIiXSwianRpIjoiUFBFaXhCcGh3bzRaVXpRaTc4eG9ZcXNFTUZvIiwiY2xpZW50X2lkIjoiZjg1ZjE1ODRhOWRmNGIyZTk3NjdlMzdhZGIxY2E1ODkifQ.huyNL-6E-ohpb_6VuanT1-ubLLGiwP3CDs0BUqxPFBc' \
--data '{
  "queryDsl": {
    "query_string": {
      "query": "type:ACCESS_REQUEST AND attributes.accessItemType:Entitlement AND attributes.removeDate:* AND status:STARTED"
    }
  },
  "indices": ["events"],
  "queryType": "DSL"
}

'

this will give u empty result because currently we don't have data for the yesterday date on the tenant
u can modify the query to like below
attributes.interface:access-sunrise-sunset AND operation:REMOVE AND created:[now-25d/d TO now]

this will give you data of access removed 25 days before