# Microservices Projet

This project is a basic setup for a React.js application using Vite with a client-side folder and a server-side folder.

## Contributors

[Rabii Ababsa](https://github.com/Noryuxd) <br>
[Agourram Mohammed Ali](https://github.com/mohamed-ali-agourram)<br>
[Ahmed Bachir El Mahmoudi](https://github.com/AhmedBachirElMahmoudi)<br>

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js: [Download here](https://nodejs.org/)
- npm: (Installed with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Noryuxd/microservices-project
```
2. Navigate to the project folder

```bash
cd microservices-project
```

3. Change the .env.example file to .env and configure your variables : :

```bash
MONGODB_USERNAME="your_username"
MONGODB_PASSWORD="your_password"
```

4. Install dependencies for client :

```bash
# Install client dependencies
cd client
npm install
# Run the react application server
npm run dev
```

5. Install server dependencies for each microservice
   
```bash
# Install server dependencies for utilisateur
cd ../server/utilisateur
npm install
# Run the server
nodemon index.js
```
```bash
# Install server dependencies for produit
cd ../server/produit
npm install
# Run the server
nodemon index.js
```
```bash
# Install server dependencies for commande
cd ../server/commande
npm install
# Run the server
nodemon index.js
```
### Visit http://localhost:3000 in your browser to see the React app.
