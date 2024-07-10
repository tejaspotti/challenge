from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class SAR(db.Model):
    __tablename__ = 'sar'
    id = db.Column(db.Integer, primary_key=True)
    filed_date = db.Column(db.Date, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    bank_name = db.Column(db.String(100), nullable=False)
    bank_address = db.Column(db.String(200), nullable=False)
    suspicious_activity_code = db.Column(db.String(50), nullable=False)
    agent_narrative = db.Column(db.Text, nullable=False)
    entities_involved = db.relationship('Entity', backref='sar', lazy=True, cascade='all, delete-orphan')

    def serialize(self):
        return {
            'id': self.id,
            'filed_date': self.filed_date.isoformat(),
            'amount': self.amount,
            'bank_name': self.bank_name,
            'bank_address': self.bank_address,
            'suspicious_activity_code': self.suspicious_activity_code,
            'agent_narrative': self.agent_narrative,
            'entities_involved': [entity.serialize() for entity in self.entities_involved]
        }

class Entity(db.Model):
    __tablename__ = 'entity'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    identification_number = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    email_address = db.Column(db.String(100), nullable=False)
    sar_id = db.Column(db.Integer, db.ForeignKey('sar.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'identification_number': self.identification_number,
            'phone_number': self.phone_number,
            'date_of_birth': self.date_of_birth.isoformat(),
            'email_address': self.email_address
        }
