
# Approach and Challenges

## Approach

1. **Frontend Design**:
   - Created a `mockData.json` file to simulate backend data based on the requirements file.
   - Designed the frontend layout and identified necessary APIs.

2. **Backend Development**:
   - Utilized Flask, SQLAlchemy, and Alembic to create PostgreSQL tables and relationships based on `model.py`.
   - Developed RESTful methods and tested them using Postman.

3. **Integration**:
   - Integrated backend with frontend by creating a service (`sarService.ts`).
   - Dockerized the backend for containerization.

4. **Detail Enhancements**:
   - Implemented field validation on the frontend.
   - Added SAR View feature.
   - Created Unit Tests.
   - Used Pydantic for data validation on the backend.
   - Introduced API versioning.
   - Implemented pagination for SAR lists.
   - Added search functionality for SAR lists.
   - Enabled sorting of SAR lists based on selected fields.
   - Integrated `react-toastify` for notifications on successful CRUD operations.

## Challenges

1. **Form Cancellation**:
   - Issue: Users may abandon form filling or editing.
   - Solution: Created an `onCancel` function to reset the form's state.

2. **Acknowledgement on CRUD Operations**:
   - Issue: Lack of feedback on successful SAR creation, edit, or deletion.
   - Solution: Implemented `react-toastify` for notification delivery.

3. **Viewing Long SARs**:
   - Issue: Difficulty in viewing long SAR entries.
   - Solution: Implemented a scroll feature for better navigation.

4. **Pagination**:
   - Issue: Managing a large number of SAR entries on a single page.
   - Solution: Added pagination to load SARs in manageable batches.


