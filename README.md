# Eastern Standard Developer Challenge

This project is a PHP and MySQL-based employee management prototype created as part of the Eastern Standard Senior Developer Challenge. It allows employees to securely log in and update their information, and provides administrators with the ability to view and manage all employee records.

## Features

- Secure login/logout system using PHP sessions
- Role-based access control (Employee vs Admin)
- Edit logged-in employee’s own information
- Admins can select and update any employee
- Add new employee via separate creation form
- Clean front-end UI with basic styling
- Uses `fetch()` API for asynchronous updates

## File Structure



## Getting Started

### 1. Install MAMP

- Download and install [MAMP](https://www.mamp.info/en/) for macOS or Windows.
- Launch MAMP
- Set Apache port to `8888` and MySQL port to `8889` (default MAMP config)

### 2. Clone or Extract the Project

Place it inside your MAMP `htdocs/` directory, e.g.: /Applications/MAMP/htdocs/eastern-standard/

Or clone it via Git:

```bash
git clone https://github.com/peytonbgregory/EasternStandard.git

```

### 3. Import the Database
- Go to http://localhost:8888/phpMyAdmin
- Create a new database: es_challenge
- Import the es_challenge.sql file

### 4. Run Locally
Make sure MAMP is running (Apache and MySQL), then open: http://localhost:8888/

### 5. Login Credentials
- Admin User/Pass: admin/admin
- Employee User/Pass: joe/password



## Requirments
### Employees can login and edit:

- First & Last name
- DOB
- Phone number
- Office number
- Category (dropdown)

### Admins can:

- Login
- Edit any employee
- Add new employees and admins via create_user.html

## Architecture Assessment
### Pros:

- Simple, modular structure with separation of concerns
- PDO used for secure DB connection
- Vanilla PHP and JS—easy to maintain

### Cons (original code):

- No validation or input sanitization
- Logic spread out across unscalable scripts
- Missing role checks and safe DB handling

### Fixes/Changes made:

- Fixed session handling
- Isolated API logic to EmployeeApi.php
- Added proper form population and submission
- Created dedicated user creation UI

## Author
Built by Peyton Gregory for the Eastern Standard Developer Challenge 2025.
