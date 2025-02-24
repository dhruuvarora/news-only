# 📰 News App (Real-Time News Broadcasting)

A **real-time news application** where the **admin can upload news articles**, and users **instantly receive updates** with **notifications** for the latest news.

## 🔹 Overview
This **News App** enables an **admin** to **upload news articles** from the **admin panel**, which are immediately displayed in the **user section**. Users receive **real-time notifications** when new news is uploaded. The system allows uploading **up to 5 images per news article**.

## 🔹 Features
✅ **Admin Panel for News Upload** – Admins can create and manage news articles.  
✅ **Real-Time News Updates** – Users receive news **instantly** without refreshing.  
✅ **Live Notifications** – A notification appears when the **latest news** is uploaded.  
✅ **Image Upload Support** – Admins can **upload up to 5 images** per news article.  
✅ **Efficient & Scalable** – Built with a **real-time backend** using WebSockets.  

## 🔹 Tech Stack
- **Frontend:** EJS, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Real-Time Communication:** WebSockets (Socket.io)  
- **Storage:** Multer (for image uploads)  

## 🔹 How It Works
1. **Admin logs in** to the panel and uploads a **news article** with a **title, description, and up to 5 images**.
2. **News is stored in MongoDB**, and **WebSockets** push the update to all users in real-time.
3. **Users instantly see the latest news** appear on their screen **without refreshing**.
4. **A notification banner** pops up to inform users about newly uploaded news.
5. **Users can view images and full details** of each news article.

## 🔹 Installation & Setup
```sh
# Clone the repository
git clone https://github.com/yourusername/news-app.git
cd news-app

# Install dependencies
npm install

# Start the server
node index.js
