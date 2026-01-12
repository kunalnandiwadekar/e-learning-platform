
# 🎓 E-Learning Platform – Frontend

A modern, responsive e-learning platform built with React that allows users to browse courses, enroll in them, and track their learning progress. Administrators have access to a dedicated dashboard for course and user management.

## 🚀 Features

### 👨‍🎓 For Students
- Browse and search available courses
- Enroll in courses of interest
- Track course progress and completion
- View course details and lesson content
- Responsive design for all devices

### 👨‍💼 For Administrators
- Dashboard with platform analytics
- Full CRUD operations for courses
- Manage course content and structure
- View and manage user enrollments
- Upload and manage course thumbnails

## � Tech Stack

- **Frontend Framework**: React 18 with Vite
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Authentication**: JWT
- **Form Handling**: React Hook Form
- **Icons**: React Icons

## 🏗 Project Structure

```
frontend/
├── public/                  # Static files
│   └── placeholder-course.png
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── MyCourses.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── auth.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│   └── placeholder-course.png
│
├── package.json
├── vite.config.js         # Vite configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-learning-platform.git
   cd e-learning-platform/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=E-Learning Platform
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## � Authentication

The application uses JWT-based authentication:
- Tokens are stored in `localStorage`
- Protected routes require authentication
- Role-based access control (Student/Admin)
- Auto-logout on token expiration

## 🖼 Assets

- Course thumbnails are served from the backend at `http://localhost:5000/uploads/<image>`
- Fallback image is used when a thumbnail is not available
- Optimized image loading with lazy loading

## 🧪 Testing

Run tests with:
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

The frontend is optimized for deployment on modern platforms:

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` and follow the prompts

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📚 Documentation

- [API Documentation](https://your-api-docs.com) (Link to your API docs)
- [Component Library](https://storybook.js.org/) (If applicable)

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
