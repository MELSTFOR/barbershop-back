# Barbershop Application Backend

This is the backend for a barbershop application built using Node.js, Express, and PostgreSQL. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Configuration](#database-configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd barbershop-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your database credentials:
   ```
   DATABASE_URL=your_database_url
   ```

## Usage

To start the application, run:
```
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

- **GET /api/barbers**: Retrieve a list of barbers.
- **POST /api/barbers**: Add a new barber.
- **GET /api/stock**: Retrieve stock items.
- **POST /api/stock**: Add a new stock item.
- **GET /api/profiles**: Retrieve user profiles.
- **POST /api/profiles**: Create a new user profile.

## Database Configuration

This application uses PostgreSQL as the database. Ensure that your database is running and the credentials are correctly set in the `.env` file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.