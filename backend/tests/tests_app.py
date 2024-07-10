import unittest
import json
from app import app, db, SAR, Entity

class SARTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
        self.app.testing = True
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_sar(self):
        sar_data = {
            "filed_date": "2023-06-21",
            "amount": 10000.00,
            "bank_name": "Example Bank",
            "bank_address": "123 Bank St, Example City, EX 12345",
            "suspicious_activity_code": "Fraud",
            "agent_narrative": "This is a test narrative describing the suspicious activity.",
            "entities_involved": [
                {
                    "full_name": "John Doe",
                    "identification_number": "ID123456789",
                    "phone_number": "+1234567890",
                    "date_of_birth": "1980-01-01",
                    "email_address": "john.doe@example.com"
                },
                {
                    "full_name": "Jane Smith",
                    "identification_number": "ID987654321",
                    "phone_number": "+0987654321",
                    "date_of_birth": "1990-02-02",
                    "email_address": "jane.smith@example.com"
                }
            ]
        }
        response = self.app.post('/sar', data=json.dumps(sar_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['bank_name'], "Example Bank")
        self.assertEqual(len(data['entities_involved']), 2)

    def test_get_all_sars(self):
        response = self.app.get('/sar')
        self.assertEqual(response.status_code, 200)

    def test_get_sar(self):
        sar = SAR(
            filed_date="2023-06-21",
            amount=10000.00,
            bank_name="Example Bank",
            bank_address="123 Bank St, Example City, EX 12345",
            suspicious_activity_code="Fraud",
            agent_narrative="This is a test narrative describing the suspicious activity."
        )
        db.session.add(sar)
        db.session.commit()
        response = self.app.get(f'/sar/{sar.id}')
        self.assertEqual(response.status_code, 200)

    def test_update_sar(self):
        sar = SAR(
            filed_date="2023-06-21",
            amount=10000.00,
            bank_name="Example Bank",
            bank_address="123 Bank St, Example City, EX 12345",
            suspicious_activity_code="Fraud",
            agent_narrative="This is a test narrative describing the suspicious activity."
        )
        db.session.add(sar)
        db.session.commit()
        sar_data = {
            "filed_date": "2023-06-22",
            "amount": 15000.00,
            "bank_name": "Updated Bank",
            "bank_address": "456 Updated St, Example City, EX 12345",
            "suspicious_activity_code": "Money Laundering",
            "agent_narrative": "Updated narrative.",
            "entities_involved": []
        }
        response = self.app.put(f'/sar/{sar.id}', data=json.dumps(sar_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['bank_name'], "Updated Bank")

    def test_delete_sar(self):
        sar = SAR(
            filed_date="2023-06-21",
            amount=10000.00,
            bank_name="Example Bank",
            bank_address="123 Bank St, Example City, EX 12345",
            suspicious_activity_code="Fraud",
            agent_narrative="This is a test narrative describing the suspicious activity."
        )
        db.session.add(sar)
        db.session.commit()
        response = self.app.delete(f'/sar/{sar.id}')
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()
