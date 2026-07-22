# User Management System  


A simple CRUD application built with **Node.js**, **Express**, **EJS**, and **MySQL**. It allows you to **create**, **read**, **update**, and **delete** user records stored in a MySQL database.

## Features

- Add new users
- View all users in a table
- Update existing user details
- Delete users
- Server-side rendering with EJS
- MySQL database integration
- UUID-based user IDs

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL / MySQL2
- **Template Engine:** EJS
- **Middleware:** method-override
- **Utilities:** uuid, @faker-js/faker

## Project Structure

- `index.js` — Main server file
- `views/` — EJS templates for the UI
- `schema.sql` — Database table schema
- `package.json` — Project dependencies and scripts

## Database Schema

The app uses a `user` table with the following fields:

- `id` — Primary key
- `username` — User name
- `email` — Unique email address
- `password` — User password

Example schema:

```sql
CREATE TABLE USER(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/altafKhan-nep/CRUD-user-adding-app-using-node-mysql.git
cd CRUD-user-adding-app-using-node-mysql
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the MySQL database

Create a database named `media_app`, then run the schema file:

```bash
mysql -u root -p media_app < schema.sql
```

### 4. Configure database credentials

Update the MySQL connection settings in `index.js` if needed:

```js
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "media_app",
  password: "your_password",
});
```

### 5. Start the server

```bash
node index.js
```

The app will run at:

```bash
http://localhost:8080
```

## Routes

- `GET /` — Show total number of users
- `GET /user` — Show all users
- `GET /user/new` — Open the add user form
- `POST /user` — Add a new user
- `GET /user/:id/edit` — Open the edit user form
- `PATCH /user/:id` — Update a user
- `GET /user/:id/delete` — Open the delete confirmation page
- `DELETE /user/:id` — Delete a user

## Notes

- The project uses EJS templates for pages.
- Password verification is required before updating or deleting records.
- Ensure MySQL is running before starting the app.
- The repository currently includes `node_modules/`, which is typically excluded in production using `.gitignore`.

## Author

**Altaf Khan**

## License

This project is licensed under the **ISC License**.
