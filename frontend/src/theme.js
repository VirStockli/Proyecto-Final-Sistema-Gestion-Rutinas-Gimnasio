// Colores principales del diseño
export const colors = {
  // Colores primarios
  violet: {
    50: '#f5f0ff',
    100: '#ede9fe',
    500: '#a855f7', // Violeta eléctrico
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  
  orange: {
    400: '#fb923c', // Naranja eléctrico
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
  },
  
  gold: {
    300: '#fcd34d',
    400: '#facc15', // Dorado
    500: '#eab308',
    600: '#ca8a04',
  },
  
  // Grises para modo claro y oscuro
  light: {
    bg: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#1f2937',
    textSecondary: '#6b7280',
  },
  
  dark: {
    bg: '#0f172a',      // Azul muy oscuro
    surface: '#1e293b',  // Gris-azul oscuro
    border: '#334155',   // Gris oscuro
    text: '#f1f5f9',     // Blanco casi
    textSecondary: '#cbd5e1',
  },
  
  // Estados
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

// Tema Claro
export const lightTheme = {
  colors: colors.light,
  primary: colors.violet[600],
  secondary: colors.orange[500],
  accent: colors.gold[400],
  
  // Gradientes
  gradients: {
    primary: `linear-gradient(135deg, ${colors.violet[600]} 0%, ${colors.violet[700]} 100%)`,
    vibrant: `linear-gradient(135deg, ${colors.violet[600]} 0%, ${colors.orange[500]} 100%)`,
    soft: `linear-gradient(135deg, ${colors.violet[50]} 0%, ${colors.orange[100]} 100%)`,
  },
};

// Tema Oscuro
export const darkTheme = {
  colors: colors.dark,
  primary: colors.violet[500],
  secondary: colors.orange[400],
  accent: colors.gold[400],
  
  // Gradientes
  gradients: {
    primary: `linear-gradient(135deg, ${colors.violet[500]} 0%, ${colors.violet[600]} 100%)`,
    vibrant: `linear-gradient(135deg, ${colors.violet[500]} 0%, ${colors.orange[400]} 100%)`,
    soft: `linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)`,
  },
};

// Hook personalizado para obtener el tema actual
export const getTheme = (isDark) => {
  return isDark ? darkTheme : lightTheme;
};