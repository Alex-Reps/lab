from flask import Flask, request, jsonify, render_template
import psycopg2

app = Flask(__name__, static_folder='static')

# Подключение к базе данных PostgreSQL

conn = psycopg2.connect(
    dbname="avto_school",
    user="lab_tester",
    password="lab_tester",
    host="localhost",
    port=5432
)

car_images = {
    "Лада Гранта": "https://avatars.mds.yandex.net/i?id=17633b0b7eab2705670d0ddff11b8da77e6f6173-10695933-images-thumbs&n=13",
    "Лада Веста": "https://avatars.mds.yandex.net/i?id=b2147e4acb97315dcb07172f33fccfe7_l-5386020-images-thumbs&n=13",
    "Киа RIO": "https://a.d-cd.net/b6e66aas-960.jpg",
    "Hyundai Solaris": "https://avatars.mds.yandex.net/i?id=dd15ce6b44dd004ec16540852e9dabb02bea8b7d-13457071-images-thumbs&n=13"
}

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
            {"name": row[0], "experience": row[1], "car_model": row[2], "image": car_images.get(row[2], "https://example.com/default.jpg")}
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

        cursor.execute(
            "SELECT COUNT(*) FROM applications WHERE full_name = %s AND group_name = %s AND phone = %s",
            (name, group, phone)
        )
        result = cursor.fetchone()

        if result[0] > 0:
            cursor.close()
            return "Уже есть такая заявка."
        else:
            cursor.execute("INSERT INTO applications (full_name, group_name, phone) VALUES (%s, %s, %s)", 
                        (name, group, phone))
            conn.commit()
            cursor.close()
            return "Заявка успешно отправлена."
    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True)