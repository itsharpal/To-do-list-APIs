# 📝 To-Do List API

A simple and secure **To-Do List REST API** built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features
- 🔐 User authentication (JWT + cookies)  
- 🧾 Create, read, update, and delete tasks  
- 🔍 Search & filter by title or description  
- ⏫ Pagination and sorting support  
- 🧠 Clean MVC structure with protected routes  

---

## ⚙️ Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/todo-list-api.git
cd todo-list-api

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_secret_key
PORT=5000

# 4️⃣ Start the server
npm run dev


⸻

📚 API Endpoints

Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
POST	/api/tasks	Create task
GET	/api/tasks	Get all tasks (filter, sort, paginate)
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task


⸻

🧩 Example Task

{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}


⸻

Built as part of the roadmap.sh To-Do List API project.
[text](https://roadmap.sh/projects/todo-list-api)