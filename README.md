# CloudStore - your cloud based data storage platform

This is a AWS based data storage platform with features like user management, file upload and retrieve , unique link for each file with password based protection and much. currently we store documents and plans to add videos and more formats for users

### Tech stacks

- MongoDB
- AWS S3 for file storage

**Features**

- **User Authentication:** Signup and login functionality .
- **File Upload:** Upload files to AWS S3.
- **File Management:** Retrieve and delete user files.
- **Link sharing:** share uniue links with people with password protected files
- **Secure & Reliable :** Backed by AWS s3 claims 99.9999(11 times) of files being stored securely .

**Project Structure**

```
.
├── app.js      # Main application entry point
├── config.json # AWS S3 configuration file
├── controllers # Controllers for business logic
│   ├── authController.js
│   └── userController.js
├── models      # Mongoose models for MongoDB collections
│   ├── loginDataModel.js
│   └── userDataModel.js
├── routes      # Route definitions for the API
│   ├── authRoutes.js
│   └── userRoutes.js
├── utils       # Utility functions (e.g., S3 utilities)
│   └── s3Utils.js
└── views       # Frontend views (EJS templates)
    └── index.html

```

**Tech Stack**

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Cloud: AWS cloudfront(CDN), route53, cloudwatch, internet gateway all inside cutsom VPC
- File Storage: AWS S3
- Frontend: html,css, javascript
- Middleware:auth-token , Multer (for file uploads)

**Getting Started**

**Prerequisites**

- Node.js and npm installed
- MongoDB running locally or a MongoDB Atlas connection URI
- AWS S3 bucket and IAM credentials with proper permissions

**Installation**

1.  Clone the repository:

Bash

```
git clone https://github.com/yourusername/express-mongoose-file-upload.git

```

2.  Change directory:

Bash

```
cd express-mongoose-file-upload

```

3.  Install dependencies:

Bash

```
npm install

```

4.  Configure your S3 credentials in `config.json`:

JSON

```
{
  "accessKeyId": "your-access-key-id",
  "secretAccessKey": "your-secret-access-key",
  "region": "your-region"
}

```

5.  Start the application:

Bash

```
node app.js

```

**API Endpoints**

**Authentication Routes**

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

**User Routes**

- `POST /api/user/userdata`: Upload user files.
- `GET /api/user/userdata`: Retrieve user data by email.
- `GET /api/user/delete`: Delete a user file from S3.

**How to Use**

1.  Start MongoDB locally:

Bash

```
mongod

```

2.  Run the app:

Bash

```
node app.js

```

3.  Test the API using Postman or any other API client.
