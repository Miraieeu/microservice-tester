# Gunakan image Node resmi
FROM node:18

# Buat folder kerja
WORKDIR /app

# Copy package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Copy semua file
COPY . .

# Jalankan server
CMD ["node", "app.js"]

# Port yang digunakan
EXPOSE 3000
