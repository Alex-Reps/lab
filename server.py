from flask import Flask, request, jsonify, render_template
import psycopg2

app = Flask(__name__, static_folder='static')

# Подключение к базе данных PostgreSQL
"""conn = psycopg2.connect(
    dbname="auto_school",
    user="lab_tester",
    password="lab_tester",
    host="localhost",
    port="5432"
)"""

conn = psycopg2.connect(
    dbname="avto_school",
    user="lab_tester",
    password="lab_tester",
    host="localhost",
    port=5432
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/instructors')
def get_instructors():
    try:
        # Запрос к базе данных
        cursor = conn.cursor()
        cursor.execute("SELECT fio, experience, car FROM instructors")
        instructors = cursor.fetchall()
        # Формируем JSON-ответ
        data = [
            {"name": row[0], "experience": row[1], "car_model": row[2]}
            for row in instructors
        ]
        cursor.close()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@app.route('/submit', methods=['POST'])
def submit_application():
    try :
        data = request.json
        name = data['name']
        group = data['group']
        phone = data['phone']

        cursor = conn.cursor()
        cursor.execute("INSERT INTO applications (name, group_name, phone) VALUES (%s, %s, %s)", 
                    (name, group, phone))
        conn.commit()
        cursor.close()
        print('goood')
        return "Заявка успешно отправлена."
    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True)