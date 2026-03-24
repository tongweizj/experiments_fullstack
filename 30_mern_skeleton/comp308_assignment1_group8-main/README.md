# Express API Testing Guide (Postman)

This guide provides instructions on how to test the API using Postman, covering the complete flow from user creation to managing courses.

## Base Information
- **Base URL:** `http://localhost:5000`
- **Authentication:** JWT (Stored in a cookie named `token`)

---

## 1. Create New User (Sign Up)
You must create an account before accessing protected routes.

- **Method:** `POST`
- **URL:** `http://localhost:5000/`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "firstName": "Tom",
  "lastName": "Cruise",
  "email": "tom@example.com",
  "username": "user123",
  "password": "pass123"
}
```

---

## 2. User Sign In (Login)
After a successful login, the server sets a cookie named `token` containing the JWT. Postman will automatically store and include this cookie in subsequent requests.

- **Method:** `POST`
- **URL:** `http://localhost:5000/signin`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "auth": {
    "username": "user123",
    "password": "pass123"
  }
}
```
> **Note:** The backend requires the credentials to be nested within an `auth` object.

---

## 3. Create a New Course
**Prerequisite:** You must be signed in.

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/courses`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "courseCode": "COMP308",
  "courseName": "Emerging Technologies",
  "section": "001",
  "semester": "Winter 2026"
}
```

---

## 4. Get Course List

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/courses`

---

## 5. Sign Out
This will clear the `token` cookie in Postman.

- **Method:** `GET`
- **URL:** `http://localhost:5000/signout`

---

## Troubleshooting
1. **401 Unauthorized / screen: "auth":** This means your session has expired (JWT expiry is set to 300 seconds) or you are not logged in. Please perform the Sign In step again.
2. **Postman Cookies:** Ensure Postman's cookie management is enabled (default behavior) so that the `token` is automatically sent with your requests.