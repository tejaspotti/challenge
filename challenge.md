``<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#technical-take-home-challenge">Technical Take Home Challenge</a>
      <ul>
        <li><a href="#objective">Objective</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#task-description">Task Description</a></li>
        <li><a href="#project-guidelines">Project Guidelines</a></li>
        <li><a href="#submission-instructions">Submission Instructions</a></li>
        <li><a href="#bonus-points">Bonus Points</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- TECHNICAL TAKE HOME CHALLENGE -->

## Technical Take Home Challenge

### Objective

Develop a simple CRUD application for bank agents to file financial Suspicious Activity Reports (SARs). The application will include a Next.js frontend, a Flask API backend, and a PostgreSQL database to support creating, reading, updating, and deleting SAR records.

### Requirements
`
**Frontend**

- Language: TypeScript
- Framework: Next.js
- [![TypeScript][TypeScript]][TypeScript-url] [![Next][Next.js]][Next-url]

**Backend**

- Language: Python
- Framework: Flask API
- [![Python][Python]][Python-url] [![Flask][Flask]][Flask-url]

**Database**

- Type: PostgreSQL
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

### Task Description

You are required to build a web application that allows bank agents to file Suspicious Activity Reports (SARs). The application should support the following functionalities:

- Create a new SAR
- Retrieve a list of SARs
- Update an existing SAR
- Delete a SAR

### Data Structure for Suspicious Activity Report

Each SAR should include the following fields:

1. Filed Date
2. Amount
3. Bank Name
4. Bank Address
5. Suspicious Activity Code
   - A dropdown list with 5 predefined codes:
     - Structuring
     - Money Laundering
     - Fraud
     - Terrorist Financing
     - Insider Trading
6. Agent’s Narrative
7. Entities Involved
   - Full Name
   - Identification Number
   - Phone Number
   - Date of Birth
   - Email Address

### Project Guidelines

1. **Frontend Requirements:**

   - Create a simple UI using Next.js and TypeScript.
   - You are free to use any component or styling library.
   - Display a list of existing SARs with options to view, edit, and delete each report.

2. **Backend Requirements:**

   - Develop a RESTful API using Flask.
   - Implement CRUD operations for SARs.

3. **Database Requirements:**
   - Design a PostgreSQL database to store SAR data.
   - Create necessary tables and relationships.

### Submission Instructions

1. **Code Repository:**

   - Fork the repository and clone the repository to your local machine.
   - Create a Pull Request (PR) to this repository for submission.
   - Include a README file with instructions on how to set up and run the application locally.

2. **Documentation:**
   - Include API documentation detailing the endpoints and how to use them.
   - Provide a brief overview of your approach, any challenges faced, and how you addressed them.

### Bonus Points

- Add unit and integration tests.
- Dockerize your application and database.
- Include advanced features like filtering and sorting the SAR list.
`
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Python]: https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/api/
[PostgreSQL]: https://img.shields.io/badge/postgresql-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
``