export const theme = {
  colors: {
    primary: "#2A2E43", // Main background color
    headerBackground: "rgba(255, 255, 255, 0.1)", // Subtle header background
    accent: "#FF6B6B", // Vibrant color for buttons and highlights
    secondary: "#B0BEC5", // Warm gray for secondary elements
    textPrimary: "#FFFFFF", // Primary text color
    textSecondary: "#CFD8DC", // Secondary text for less emphasis
    cardBackground: "rgba(255, 255, 255, 0.15)", // Semi-transparent card background
    buttonBackground: "#FF6B6B", // Consistent with accent for buttons
  },
  fontSizes: {
    header: 24, // Main header (e.g., "My Tasks")
    title: 20, // Task titles
    body: 16, // Standard text
    secondary: 14, // Smaller text for less emphasis
  },
  borderRadius: {
    small: 8, // For buttons and smaller elements
    medium: 15, // For cards
    large: 20, // For larger containers
  },
  shadow: {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  },
  padding: {
    small: 12, // For tighter spaces
    medium: 18, // Standard padding
    large: 24, // For larger containers
  },
  margin: {
    small: 10,
    medium: 15,
    large: 20,
  },
};
