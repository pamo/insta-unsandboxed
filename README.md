# insta-unsandboxed

Uses the Node [Instagram Private API](https://github.com/huttarichard/instagram-private-api) to fetch authenticated user's feed.

## Necessary configuration:

Create an empty cookie file in `config` with the name of the user to authenticate.
```
touch <USER>.json
```

In `config/default.json`
```
{
  "auth": {
    "user": "<USER>",
    "pass": "<PASS>"
  }
}
```
## Tests

```
  npm install
  npm test
```
