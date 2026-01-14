# Webbundle Starter Kit - Supplier OS Application

This is a React TypeScript starter project representing a "Bug Bounty Challenge" application. It includes a home page listing known issues (which have been fixed), a user avatar menu, and language switching capabilities.

## Features

- **React & TypeScript**: Built with strict typing for robustness.
- **State Management**: MobX for user state.
- **UI Components**: Material-UI (MUI) v5.
- **Internationalization**: `react-i18next` with English (EN) and German (DE) support.
- **Routing**: `react-router-dom` v5 with custom hook-based routing.

## Prerequisites

- **Node.js**: Version 17 (only this version works, no `NODE_OPTIONS` variable needed).
- **Package Manager**: npm.

## Installation

```bash
npm install
```

## Development

To start the development server on `http://localhost:3000`:

```bash
npm start
```

> The `start` script automatically handles configuration and disables the incompatible legacy ESLint plugin via `.env`.


## Project Structure

- `src/api`: API services and MobX stores (e.g., `UserStore`).
- `src/components`: Reusable UI components (`AppHeader`, `AvatarMenu`).
- `src/i18n`: Locale configuration and JSON translation files.
- `src/pages`: Application pages (`Home`, `Root`).
- `src/themes`: MUI theme customization.
- `src/utils`: Helper functions.

## Known Issues (Fixed)

The following bugs were present in the initial codebase and have been resolved:
1.  **Console Error**: Fixed unique `key` prop warning in Home list.
2.  **Bold Text**: Fixed `i18n` interpolation using `<Trans>` component.
3.  **User Avatar**: Fixed missing avatar (typo in store) and crash (ref forwarding).
4.  **Countdown**: Fixed `useEffect` memory leak/glitch.
5.  **Language**: Implemented full language switcher and fallback logic.
6.  **Startup**: Fixed `process is not defined` error via `react-error-overlay` pin.
7.  **Compilation**: Resolved Typescript/Webpack conflicts.
