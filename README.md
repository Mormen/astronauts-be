**Astronaut system BE**
- This is backend for astronaut system web application
- To run you will need
1. host own MySQL db
2. in root folder create .db.env file with followings with corresponding credentials (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT)
3. in docker-compose.yml set corresponding environment
4. run 
`docker-compose build --no-cache`
`docker-compose up`
