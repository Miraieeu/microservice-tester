from flask import Flask
import redis
import requests # Ditambahkan dari Kode Kedua
response = requests.get("http://ms1-backend:3000/")

app = Flask(__name__)

# Inisialisasi klien Redis (dari Kode Pertama)
# Pastikan 'ms2-redis' adalah hostname yang benar untuk layanan Redis Anda
try:
    client = redis.Redis(host='ms2-redis', port=6379, socket_connect_timeout=5)
    client.ping() # Melakukan ping untuk mengecek koneksi saat startup
    print("Berhasil terhubung ke Redis.")
except redis.exceptions.ConnectionError as e:
    print(f"Gagal terhubung ke Redis: {e}")
    client = None # Set client ke None jika koneksi gagal

# Endpoint utama MS2 (dari Kode Kedua, menggantikan definisi '/' dari Kode Pertama)
@app.route("/")
def home():
    return "Halo dari Microservice 2 (Python)"

# Endpoint untuk interaksi Redis (dari Kode Pertama, rute diubah untuk menghindari konflik)
@app.route('/redis-status')
def redis_status():
    if not client:
        return "Klien Redis tidak terinisialisasi atau gagal terhubung.", 500
    try:
        client.set('ping', 'pong')
        value = client.get('ping')