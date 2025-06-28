# To-Do App (Expo + Firebase)

A cross-platform to-do app built with [Expo](https://expo.dev), [React Native](https://reactnative.dev/), and [Firebase](https://firebase.google.com/).  
Features authentication, persistent storage, and a modern UI.

## Features

- User authentication (Firebase)
- Add, update, and delete tasks
- Task progress and statistics
- Persistent storage with AsyncStorage
- Responsive UI for Android, iOS, and Web

## Project Structure

```
.
├── app/                # Main app source (routes, screens)
├── components/         # Reusable UI components
├── constants/          # Theme, variables, etc.
├── config/             # Firebase config
├── type/               # TypeScript types
├── utils/              # Utility functions (storage, etc.)
├── assets/             # Fonts, images
├── app-example/        # Example starter app
├── .expo/              # Expo config
├── .vscode/            # VSCode settings
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npm run start
   ```

   - Open in Expo Go, Android emulator, or iOS simulator.

## Scripts

- `npm run start` — Start the Expo development server
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device
- `npm run web` — Run in the browser
- `npm run lint` — Lint the codebase
