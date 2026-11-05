# 📚 BookNook - Modern Library & Book Borrowing Platform

Welcome to **BookNook**, a full-stack, responsive book borrowing and management web application designed for passionate readers, curators, and collectors. BookNook delivers an elegant, user-friendly reading and borrowing experience with authentication, collection tracking, and real-time inventory management.

---

## 🌐 Live Site
- **Live URL**: [https://booknook-client-11.vercel.app](https://booknook-client-11.vercel.app)

---

## ✨ Key Features

- **📖 Extensive Book Exploration & Categorization**: Browse and discover books across a diverse spectrum of genres (Philosophy, Psychology, Sci-Fi, Thriller, Fantasy, Novel, History, and more) with real-time stock availability and a 1–10 rating system.
- **🤝 Interactive One-Click Borrowing System**: Borrow books seamlessly through an intuitive modal with pre-filled user identity verification, automatic quantity updates, and return date scheduling.
- **📋 Personal User Dashboard ("My Borrows" & "My Books")**: Dedicated, responsive tables allowing users to track their currently borrowed books with countdown dates and a one-click "Return Book" action, as well as manage books they have contributed to the catalog.
- **🔒 Robust Authentication & Session Management**: Secure authentication powered by Better-Auth with JWT support, offering both email/password signup and instant OAuth login (Google & GitHub).
- **✍️ Full Book Management (CRUD)**: Authorized users can contribute new book listings with image preview, authors, ratings, stock counts, categories, and detailed synopses, with full update and delete capabilities.
- **🎨 Modern, Responsive & Polished UI**: Built using Next.js 16 App Router, Tailwind CSS, Lucide icons, Swiper carousels, responsive tables, custom loading spinners, and an interactive 404 Not Found page tailored for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons & UI**: [Lucide React](https://lucide.dev/), [Base UI](https://base-ui.com/), [Swiper](https://swiperjs.com/)
- **Authentication**: [Better-Auth](https://www.better-auth.com/) (Email/Password, Google OAuth, GitHub OAuth, JWT)
- **Database**: [MongoDB](https://www.mongodb.com/) (via native client and Mongo Adapter)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

Follow these steps to run BookNook locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/booknook-client.git
cd booknook-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

NEXT_PUBLIC_API_URI=http://localhost:8000
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
