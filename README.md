# FocusFlow - Smart Productivity Dashboard

A single-page productivity app that helps users plan their day, focus deeply, and review progress — all client-side only.

## ✨ Features

### 🏷️ Smart Task Manager

- Add, edit, and delete tasks with priority levels (Low/Medium/High)
- Set due dates for tasks
- Mark tasks as completed with optimistic UI updates
- Tasks persist in localStorage
- React 19 `useTransition()` for smooth state updates

### ⏱️ Focus Timer (Pomodoro++)

- Customizable focus and break durations
- Visual progress ring with SVG animations
- Auto-switch between focus and break modes
- Ambient focus mode (dims the UI for distraction-free work)
- Browser notifications when sessions complete
- Session tracking for productivity analytics

### 📝 Daily Reflection

- Log daily accomplishments
- Mood selector with emoji-based interface
- Notes section for additional thoughts
- Data saved per day in localStorage

### 📊 Productivity Insights

- SVG-based charts showing tasks completed over time
- Focus time tracking and visualization
- Streak counter for consecutive productive days
- Weekly overview with completion statistics
- All analytics computed client-side

### 🎨 Theme System

- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for extended use
- **Focus Mode**: Minimalist black theme for deep concentration
- Instant theme switching with persistent UI adaptation

## 🛠️ Tech Stack

- **React 19**: Latest features including `use()`, transitions, and optimistic UI
- **Tailwind CSS v4**: Modern utility-first styling with CSS variables
- **Vite**: Fast build tool and development server
- **localStorage**: Client-side data persistence (no backend required)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Najib-Rahmi/focusflow.git
   cd focusflow
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🎯 Usage

1. **Start with Tasks**: Add your daily tasks with priorities and due dates
2. **Focus Sessions**: Use the timer for Pomodoro-style work sessions
3. **Daily Review**: End your day by logging accomplishments and mood
4. **Track Progress**: View your productivity insights and streaks
5. **Customize**: Switch between Light, Dark, and Focus themes as needed

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Project Structure

```
src/
├── features/
│   ├── tasks/
│   │   └── TaskManager.jsx
│   ├── focus/
│   │   └── FocusTimer.jsx
│   └── insights/
│       ├── DailyReflection.jsx
│       └── ProductivityInsights.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 📚 Learn More

- [React 19 Documentation](https://react.dev)
- [Tailwind CSS v4 Beta](https://tailwindcss.com/docs/v4-beta)
- [Vite Documentation](https://vite.dev)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
