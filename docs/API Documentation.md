
# API Documentation

## Endpoints

#### BASE_URL: http://localhost:5001

### 1. `/api/v1/sar`

#### Method: GET

- **Description:** Retrieves a list of all SARs.
- **Parameters:** None
- **Responses:**
  - **200 OK:** Returns a JSON array of SARs.
  - **500 Internal Server Error:** Returns an error message.

### 2. `/api/v1/sar/<id>`

#### Method: GET

- **Description:** Retrieves a specific SAR by its ID.
- **Parameters:**
  - **Path Parameter:** `id` (integer) - The ID of the SAR to retrieve.
- **Responses:**
  - **200 OK:** Returns the SAR object.
  - **404 Not Found:** Returns an error message if the SAR is not found.
  - **500 Internal Server Error:** Returns an error message.

### 3. `/api/v1/sar`

#### Method: POST

- **Description:** Creates a new SAR.
- **Request Body:**
  - **Content-Type:** application/json
  - **Schema:**
    ```json
    {
      "filed_date": "string",
      "amount": "number",
      "bank_name": "string",
      "bank_address": "string",
      "suspicious_activity_code": "string",
      "agent_narrative": "string",
      "entities_involved": [
        {
          "full_name": "string",
          "identification_number": "string",
          "phone_number": "string",
          "date_of_birth": "string",
          "email_address": "string"
        }
      ]
    }
    ```
- **Validation (using pydantic):**
  - **Filed Date:** Must be a valid date string (e.g., "2024-09-15").
  - **Amount:** Must be a number.
  - **Bank Name:** Must be a string.
  - **Bank Address:** Must be a string.
  - **Suspicious Activity Code:** Must be a string.
  - **Agent Narrative:** Must be a string.
  - **Entities Involved:** Must be a list of objects with the following fields:
    - **Full Name:** Must be a string.
    - **Identification Number:** Must be a string.
    - **Phone Number:** Must be a string.
    - **Date of Birth:** Must be a valid date string (e.g., "1988-12-25").
    - **Email Address:** Must be a valid email address.
- **Responses:**
  - **201 Created:** Returns the created SAR object.
  - **400 Bad Request:** Returns an error message if the input data is invalid.
  - **500 Internal Server Error:** Returns an error message.

### 4. `/api/v1/sar/<id>`

#### Method: PUT

- **Description:** Updates an existing SAR by its ID.
- **Parameters:**
  - **Path Parameter:** `id` (integer) - The ID of the SAR to update.
- **Request Body:**
  - **Content-Type:** application/json
  - **Schema:**
    ```json
    {
      "filed_date": "string",
      "amount": "number",
      "bank_name": "string",
      "bank_address": "string",
      "suspicious_activity_code": "string",
      "agent_narrative": "string",
      "entities_involved": [
        {
          "full_name": "string",
          "identification_number": "string",
          "phone_number": "string",
          "date_of_birth": "string",
          "email_address": "string"
        }
      ]
    }
    ```
- **Validation (using pydantic):**
  - **Filed Date:** Must be a valid date string (e.g., "2024-09-15").
  - **Amount:** Must be a number.
  - **Bank Name:** Must be a string.
  - **Bank Address:** Must be a string.
  - **Suspicious Activity Code:** Must be a string.
  - **Agent Narrative:** Must be a string.
  - **Entities Involved:** Must be a list of objects with the following fields:
    - **Full Name:** Must be a string.
    - **Identification Number:** Must be a string.
    - **Phone Number:** Must be a string.
    - **Date of Birth:** Must be a valid date string (e.g., "1988-12-25").
    - **Email Address:** Must be a valid email address.
- **Responses:**
  - **200 OK:** Returns the updated SAR object.
  - **400 Bad Request:** Returns an error message if the input data is invalid.
  - **404 Not Found:** Returns an error message if the SAR is not found.
  - **500 Internal Server Error:** Returns an error message.

### 5. `/api/v1/sar/<id>`

#### Method: DELETE

- **Description:** Deletes a specific SAR by its ID.
- **Parameters:**
  - **Path Parameter:** `id` (integer) - The ID of the SAR to delete.
- **Responses:**
  - **200 OK:** Returns a success message.
  - **404 Not Found:** Returns an error message if the SAR is not found.
  - **500 Internal Server Error:** Returns an error message.
