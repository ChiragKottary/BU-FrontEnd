# Frontend Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.6.

## Features

### Configure Form Fields Page
The application allows users to configure form fields with the following capabilities:
- **Show/Hide Fields**: Toggle visibility of each field using checkboxes
- **Required Fields**: Make fields mandatory or optional
- **Field Reordering**: Drag and drop fields to change their order
- **Available Fields**:
  - Full Name
  - Phone Number
  - Email
  - Address
- **Save Changes**: Configuration is persisted in localStorage

### Registration Form
The registration form includes the following features:

#### Field Validations:
1. **Full Name**
   - Required (if configured)
   - Minimum 3 characters
   - Only letters and spaces allowed
   - Async validation for duplicate names

2. **Phone Number**
   - Required (if configured)
   - Exactly 10 digits
   - Numbers only
   - Async validation for duplicate phone numbers

3. **Email**
   - Required (if configured)
   - Valid email format
   - Async validation for duplicate emails

4. **Address**
   - Required (if configured)
   - Must contain at least one letter
   - Allows letters, numbers, spaces, and special characters (,.-#)

### Data Storage
- Form configurations are saved in localStorage
- Registered member data is stored in localStorage
- Configurations persist across browser sessions

### Validation Features
- Real-time field validation
- Duplicate entry prevention
- Async validation for existing entries
- Clear error messages
- Required field indicators

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
