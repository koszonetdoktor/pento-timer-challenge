# Pento timer app exercise

The application is using React frontend with Node.js server. The database is called FaunaDB which is hosted on FaunaDb's servers. This database can't be run locally on your machine.

**username:** admin@example.com  
**password:** admin

The server is using basic authentication, with the credentials in the `.env` file. This file also contains the api key for the database. It is pushed to the repo for simplicity. Currently the user in the `.env` file is the only registered user, so if you change the username, the application won't retrieve any data.

## Run locally in development mode

From the root:

```
npm run install-all
```

```
npm run dev
```

### Run only the UI against mock server

This is a possibility to run the UI without server to test mock datasets.  
The `./ui/db.json` is served by the mock server. That file contains data for multiple days back in time, so it can be used for testing the period filter.

```
npm run start-ui-mock
```

## Run in production

First it has to be built with

```
npm run build
```

then

```
npm start
```
