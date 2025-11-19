# Bin-packing algorithm and API test
This project is to test using an AI development tool (Cursor) to set up a basic web app that allows us to do a quick, superficial examination and comparison of three simple bin-packing algorithms.

## Requirements
- Node.js

## Installing and using

First be sure to clone the project locally.

Then run an `npm install` both in the `back/` folder and in the `front/` folder.

The back-end, in this case, is a dedicated API server that just handles everything relating to the algorithms.

The front-end, in this case, is a dedicated front-end and a back-end that servers the static files.

To run the back locally in development mode use the command `npm run dev:server`. This will pop a back-end using the port `3000` by default.

To run the front locally, from the root you can use `npm run dev:client`, which will run a `Vite` server. It should run something by default at http://localhost:5173/

You can then play around this very basic front-end.

## Testing just the back-end

You can use the following request, for example:

```
curl --location 'localhost:3000/api/compare-algorithms' \
--header 'Content-Type: application/json' \
--data '{
    "items": [1, 2, 3],
    "binCapacity": 5
}'
```
