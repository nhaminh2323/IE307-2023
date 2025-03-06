from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    address = db.Column(db.String(255), nullable=True)
    realname = db.Column(db.String(80), nullable=True)
    watchlist = db.relationship('Watchlist', backref='user', uselist=False)

class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, nullable=False)  # Assuming movie_id is an integer
    
class WatchHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }

class FavoriteCast(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cast_id = db.Column(db.Integer, nullable=False)
    
    
# Thực hiện update cơ sở dữ liệu
with app.app_context():
    db.create_all()

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')

    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password=hashed_password,
        age=data.get('age'),
        address=data.get('address'),
        realname=data.get('realname')
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})



@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(username=data.get('username')).first()

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/update_password', methods=['POST'])
def update_password():
    data = request.get_json()
    username = data.get('username')
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    user = get_user_by_username(username)

    if user and bcrypt.check_password_hash(user.password, current_password):
        hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_new_password

        db.session.commit()
        return jsonify({'message': 'Password updated successfully'})
    else:
        return jsonify({'message': 'Invalid credentials or user not found'}), 400

@app.route('/api/add_remove_watchlater', methods=['POST'])
def add_remove_watchlater():
    data = request.get_json()
    username = data.get('username')
    # movie_id = data.get('movie_id')
    user = get_user_by_username(username)

    if user:
        movie_id = data.get('movie_id')

        # Kiểm tra xem movie_id đã có trong watchlist chưa
        watchlist_entry = Watchlist.query.filter_by(user_id=user.id, movie_id=movie_id).first()

        if watchlist_entry:
            # Nếu đã tồn tại, xóa khỏi watchlist
            db.session.delete(watchlist_entry)
            message = 'Removed from watchlist'
            result = False
        else:
            # Nếu chưa tồn tại, thêm vào watchlist
            new_watchlist_entry = Watchlist(user_id=user.id, movie_id=movie_id)
            db.session.add(new_watchlist_entry)
            message = 'Added to watchlist'
            result = True

        db.session.commit()
        response_data = {'message': message, 'result': result}
        print("Response data:", response_data)  # Add this line for debugging
        return jsonify(response_data)
    else:
        return jsonify({'message': 'User not found'}), 400

@app.route('/api/add_fav_cast', methods=['POST'])
def add_fav_cast():
    data = request.get_json()
    username = data.get('username')
    # movie_id = data.get('movie_id')
    user = get_user_by_username(username)

    if user:
        cast_id = data.get('cast_id')

        # Kiểm tra xem movie_id đã có trong watchlist chưa
        cast_list_entry = FavoriteCast.query.filter_by(user_id=user.id, cast_id=cast_id).first()

        if cast_list_entry:
            # Nếu đã tồn tại, xóa khỏi watchlist
            db.session.delete(cast_list_entry)
            message = 'Removed from cast list'
            result = False
        else:
            # Nếu chưa tồn tại, thêm vào watchlist
            new_cast_list_entry = FavoriteCast(user_id=user.id, cast_id=cast_id)
            db.session.add(new_cast_list_entry)
            message = 'Added to cast list'
            result = True

        db.session.commit()
        response_data = {'message': message, 'result': result}
        print("Response data:", response_data)  # Add this line for debugging
        return jsonify(response_data)
    else:
        return jsonify({'message': 'User not found'}), 400
    
@app.route('/api/check_cast_in_castlist', methods=['POST'])
def check_cast_in_castlist():
    data = request.get_json()
    username = data.get('username')
    cast_id = data.get('cast_id')

    user = get_user_by_username(username)

    if user:
        # Kiểm tra xem có entry nào trong bảng UserWatchlist với user_id và movie_id này chưa
        cast_entry = FavoriteCast.query.filter_by(user_id=user.id, cast_id=cast_id).first()

        if cast_entry:
            return jsonify({'result': True})  # Movie exists in Watchlist
        else:
            return jsonify({'result': False})  # Movie does not exist in Watchlist
    else:
        return jsonify({'message': 'User not found'}), 400

@app.route('/api/get_castlist', methods=['POST'])
def get_castlist():
    data = request.get_json()
    username = data.get('username')

    if username:
        user = get_user_by_username(username)
        if user:
            castlist_entries = FavoriteCast.query.filter_by(user_id=user.id).all()
            castlist = [entry.cast_id for entry in castlist_entries]

            return jsonify({'castlist': castlist})
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Username not provided'}), 400

@app.route('/api/add_history', methods=['POST'])
def add_history():
    try:
        data = request.get_json()
        username = data.get('username')
        user = get_user_by_username(username)

        if user:
            movie_id = data.get('movie_id')

            # Check if movie_id exists in watch history
            existing_entry = WatchHistory.query.filter_by(user_id=user.id, movie_id=movie_id).first()

            if existing_entry:
                # Movie ID already exists in watch history, do not add it again
                message = 'Movie already in watch history'
                result = False
            else:
                # Add the movie ID to watch history
                watch_history_entry = WatchHistory(user_id=user.id, movie_id=movie_id)
                db.session.add(watch_history_entry)
                
                # Kiểm tra xem movie_id đã có trong watchlist chưa
                watchlist_entry = Watchlist.query.filter_by(user_id=user.id, movie_id=movie_id).first()

                if watchlist_entry:
                    # Nếu đã tồn tại, xóa khỏi watchlist
                    db.session.delete(watchlist_entry)
                    message = 'Removed from watchlist'
                    result = False
                else:
                    # Nếu chưa tồn tại, thêm vào watchlist
                    # new_watchlist_entry = Watchlist(user_id=user.id, movie_id=movie_id)
                    # db.session.add(new_watchlist_entry)
                    message = 'nothing'
                    result = True

                db.session.commit()

            response_data = {'message': message, 'result': result}
            print("Response data:", response_data)  # Thêm dòng này để gỡ lỗi
            return jsonify(response_data)
        else:
            return jsonify({'message': 'User not found'}), 400
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'IntegrityError occurred'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/check_movie_in_watchlist', methods=['POST'])
def check_movie_in_watchlist():
    data = request.get_json()
    username = data.get('username')
    movie_id = data.get('movie_id')

    user = get_user_by_username(username)

    if user:
        # Kiểm tra xem có entry nào trong bảng UserWatchlist với user_id và movie_id này chưa
        watch_entry = Watchlist.query.filter_by(user_id=user.id, movie_id=movie_id).first()

        if watch_entry:
            return jsonify({'result': True})  # Movie exists in Watchlist
        else:
            return jsonify({'result': False})  # Movie does not exist in Watchlist
    else:
        return jsonify({'message': 'User not found'}), 400

@app.route('/api/update_profile', methods=['POST'])
def update_profile():
    data = request.get_json()
    username = data.get('username')

    user = get_user_by_username(username)

    if user:
        user.email = data.get('email')
        user.age = data.get('age')
        user.address = data.get('address')
        user.realname = data.get('realName')
        

        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'})
    else:
        return jsonify({'message': 'User not found'}), 400

@app.route('/api/get_user_info', methods=['POST'])
def get_user_info():
    data = request.get_json()
    username = data.get('username')

    user = get_user_by_username(username)

    if user:
        user_info = {
            'username': user.username,
            'email': user.email,
            'age': user.age,
            'address': user.address,
            'realname': user.realname
        }
        return jsonify(user_info)
    else:
        return jsonify({'message': 'User not found'}), 400

@app.route('/api/get_watchlist', methods=['POST'])
def get_watchlist():
    data = request.get_json()
    username = data.get('username')

    if username:
        # Lấy danh sách movie_id từ watchlist của user
        user = get_user_by_username(username)
        if user:
            watchlist_entries = Watchlist.query.filter_by(user_id=user.id).all()
            watchlist = [entry.movie_id for entry in watchlist_entries]

            return jsonify({'watchlist': watchlist})
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Username not provided'}), 400
    
@app.route('/api/get_history', methods=['POST'])
def get_history():
    data = request.get_json()
    username = data.get('username')

    if username:
        # Lấy danh sách movie_id từ watchlist của user
        user = get_user_by_username(username)
        if user:
            watch_history_entries = WatchHistory.query.filter_by(user_id=user.id).all()
            watch_history = [entry.movie_id for entry in watch_history_entries]

            return jsonify({'watch_history': watch_history})
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Username not provided'}), 400

@app.route('/api/delete_history', methods=['POST'])
def delete_history():
    data = request.get_json()
    username = data.get('username')
    
    if username:
        user = get_user_by_username(username)
        if user:
            watch_history_entries = WatchHistory.query.filter_by(user_id=user.id).all()

            if watch_history_entries:
                for entry in watch_history_entries:
                    db.session.delete(entry)

                db.session.commit()
                return jsonify({'message': 'History deleted'})
            else:
                return jsonify({'message': 'Empty history for the user'}), 404
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify({'message': 'Username not provided'}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
