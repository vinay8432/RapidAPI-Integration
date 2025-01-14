# RapidAPI-Integration

## Steps to Setup the Project

### Step 1: Clone the Repository
```bash
git clone https://github.com/vinay8432/RapidAPI-Integration.git
```

### Step 2: Use Node.js Version 16 or Above
Ensure you are using Node.js version 16 or above. You can use `nvm` to switch versions:
```bash
nvm use 16
```

### Step 3: Install Dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

### Step 4: Create a `.env` File
Create a `.env` file in the root directory with the following environment variables:

```
PORT=5000
mongouri=mongodb+srv://username:password@practicepurpose.dsxyj.mongodb.net/
JwtSecret=my_personal_secret
RAPIDAPI_KEY=sample_rapidapi_key
RAPIDAPI_HOST=sample_rapidapi_host
```

Replace the placeholders (`username`, `password`, etc.) with your actual values.

### Step 5: Start the Server
Run the following command to start the server:
```bash
npm run start
```

The server will run on the port specified in the `.env` file (default: `5000`).

## Additional Notes
- Make sure MongoDB is accessible from your environment.
- Obtain your `RAPIDAPI_KEY` and `RAPIDAPI_HOST` by signing up on [RapidAPI](https://rapidapi.com/).
- Keep the `.env` file secure and do not expose sensitive information in public repositories.

For any issues, feel free to open an issue in the repository or contact me directly.

