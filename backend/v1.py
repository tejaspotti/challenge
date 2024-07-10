from flask import Blueprint, request, jsonify
from sqlalchemy import asc, desc, cast, String
from model import db, SAR, Entity
from schemas import SARModel, ValidationError, SuspiciousActivityCode

v1 = Blueprint('v1', __name__)

@v1.route('/sar', methods=['POST'])
def create_sar():
    """Create a new SAR and associated entities."""
    try:
        data = SARModel(**request.json)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    try:
        sar = SAR(
            filed_date=data.filed_date,
            amount=data.amount,
            bank_name=data.bank_name,
            bank_address=data.bank_address,
            suspicious_activity_code=data.suspicious_activity_code.value,
            agent_narrative=data.agent_narrative
        )
        for entity in data.entities_involved:
            sar.entities_involved.append(Entity(
                full_name=entity.full_name,
                identification_number=entity.identification_number,
                phone_number=entity.phone_number,
                date_of_birth=entity.date_of_birth,
                email_address=entity.email_address
            ))
        db.session.add(sar)
        db.session.commit()
        return jsonify(sar.serialize()), 201
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@v1.route('/sar', methods=['GET'])
def get_all_sars():
    """Retrieve all SARs with pagination and sorting."""
    limit = request.args.get('limit', default=10, type=int)
    offset = request.args.get('offset', default=0, type=int)
    sort_by = request.args.get('sort_by', default='filed_date', type=str)
    sort_order = request.args.get('sort_order', default='asc', type=str)
    sort_column = getattr(SAR, sort_by, SAR.filed_date)
    sort_func = asc if sort_order == 'asc' else desc

    try:
        sars = SAR.query.order_by(sort_func(sort_column)).limit(limit).offset(offset).all()
        total_sars = SAR.query.count()
        
        return jsonify({
            'data': [sar.serialize() for sar in sars],
            'total': total_sars
        }), 200
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@v1.route('/sar/search', methods=['GET'])
def search_sars():
    """Search SARs based on query string."""
    try:
        query = request.args.get('query', '', type=str)
        limit = request.args.get('limit', default=10, type=int)
        offset = request.args.get('offset', default=0, type=int)

        search_filter = SAR.query.filter(
            SAR.bank_name.ilike(f'%{query}%') |
            cast(SAR.amount, String).ilike(f'%{query}%') |
            cast(SAR.filed_date, String).ilike(f'%{query}%')
        )

        sars = search_filter.limit(limit).offset(offset).all()
        total_sars = search_filter.count()

        serialized_sars = [sar.serialize() for sar in sars]

        return jsonify({
            'data': serialized_sars,
            'total': total_sars
        }), 200

    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@v1.route('/sar/<int:id>', methods=['GET'])
def get_sar(id):
    """Retrieve a specific SAR by its ID."""
    try:
        sar = SAR.query.get_or_404(id)
        return jsonify(sar.serialize()), 200
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@v1.route('/sar/<int:id>', methods=['PUT'])
def update_sar(id):
    """Update a specific SAR and its associated entities."""
    sar = SAR.query.get_or_404(id)
    try:
        data = SARModel(**request.json)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    try:
        sar.filed_date = data.filed_date
        sar.amount = data.amount
        sar.bank_name = data.bank_name
        sar.bank_address = data.bank_address
        sar.suspicious_activity_code = data.suspicious_activity_code.value
        sar.agent_narrative = data.agent_narrative
        # Update entities
        sar.entities_involved = []
        for entity in data.entities_involved:
            sar.entities_involved.append(Entity(
                full_name=entity.full_name,
                identification_number=entity.identification_number,
                phone_number=entity.phone_number,
                date_of_birth=entity.date_of_birth,
                email_address=entity.email_address
            ))
        db.session.commit()
        return jsonify(sar.serialize()), 200
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@v1.route('/sar/<int:id>', methods=['DELETE'])
def delete_sar(id):
    """Delete a specific SAR by its ID."""
    try:
        sar = SAR.query.get_or_404(id)
        db.session.delete(sar)
        db.session.commit()
        return '', 204
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500
