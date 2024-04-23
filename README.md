# Restaurants Search Task

A web application to search for restaurants by postcode. The app is hosted here https://salmaalaa.github.io/restaurants-task/

<img width="1440" alt="Screenshot 2024-04-23 at 21 11 22" src="https://github.com/SalmaAlaa/restaurants-task/assets/42303247/4eb00dd4-3743-486d-8d05-723011ea72fd">

**NOTE**: Please disable CORS in your browser so the app works as expected, this is because the API server does not include the necessary CORS headers to allow requests from my domain

## Features

- Users can enter their postcode to search for restaurants at this postcode.
- The app fetches restaurants data from an justeat API.
- Users can view restaurant details such as name, address, cuisines, and ratings.
- Error handling is implemented to provide feedback to users in case of invalid postcode or failed API requests.

## Technologies Used

- HTML
- CSS
- JavaScript

## Get the app up and running in development

1. Clone the repository: `git clone https://github.com/SalmaAlaa/restaurants-task.git`
2. Go to the project directory
3. Run a local server to serve the files.
   - You can Node.js's http-server by installing running these commands
     ```
     npm install -g http-server
     http-server -p 8000
     ```
   - Or if you using Vscode you can use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
4. Disbale CORS in your browser; As API server does not include the necessary CORS headers to allow requests from localhost.
5. Open `http://localhost:8000 on web browser.
