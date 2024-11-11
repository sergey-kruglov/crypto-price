# Crypto Price

An app to show cryptocurrency price for TON/USDT and USDT/TON pairs.

## Tech stack

- NestJS. It helps to start project quickly + widely used by many companies.
- MongoDB. I wanted to avoid migrations usage for this small app, it also helped to finish faster.
- React. The most used library. Picked it because people are usually familiar with it.

## How to run

### Using docker-compose

1. Edit **.env.backend** params and add your **[Coin Market Cap](https://pro.coinmarketcap.com/account)** api key
2. Run the following command:  **docker-compose up**
3. Open <http://localhost:3020>

If you need to change some of the ports configured for the project, edit **docker-compose.yml**

### Without docker

1. Create .env file in ./backend folder based on .env.example
2. Add your **[Coin Market Cap](https://pro.coinmarketcap.com/account)** api key
3. Add your MongoDB URI. You can create a free cluster in Mongo Atlas.
4. Start backend app using **npm run start:dev**
5. Create .env file in ./frontend folder based on .env.example.
6. Specify API url
7. Start frontend app using **npm start**
8. Open the link shown in the terminal

## Improvements

### Backend

- [ ] Add proper logging with included request (correlation) id
- [ ] Use Redis for fast cache and mongo/postgres for long-term cache
- [ ] Move cron job away from the service. If you run multiple instances of the app, all of them will do the same job, which is pointless.
- [ ] Add alert for unhandled process errors
- [ ] Add proper graceful shutdown logic
- [ ] Add rate limiting for the REST API based on IP

### Fronted

- [ ] Add building step and serve static site properly using Nginx or NestJS
- [ ] Add i18n + send error codes from backend instead of error messages
- [ ] Cache currencies
