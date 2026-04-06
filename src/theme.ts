import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let schoolTheme = createTheme({
  palette: {
    // Основной цвет (Навигация, активные вкладки, главные кнопки)
    primary: {
      main: '#6366F1', // Мягкий, но сочный индиго
      light: '#A5B4FC',
      dark: '#4338CA',
      contrastText: '#FFFFFF',
    },
    // Вторичный цвет (Акценты, важные уведомления, FAB-кнопки)
    secondary: {
      main: '#FB7185', // Мягкий розово-коралловый
      light: '#FDA4AF',
      dark: '#E11D48',
      contrastText: '#FFFFFF',
    },
    // Семантические цвета (Оценки, статусы, посещаемость)
    success: {
      main: '#34D399', // Мягкий мятно-зеленый (например, "Присутствует", "Отлично")
      light: '#6EE7B7',
      dark: '#059669',
    },
    warning: {
      main: '#FBBF24', // Теплый желто-горчичный ("Опоздал", "Удовлетворительно")
      light: '#FDE047',
      dark: '#D97706',
    },
    error: {
      main: '#F87171', // Приглушенный красный ("Отсутствует", "Двойка")
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    // Фоновые цвета
    background: {
      default: '#F8FAFC', // Очень светлый серо-синий для основного фона приложения
      paper: '#FFFFFF', // Чисто белый для карточек, виджетов и таблиц
    },
    // Цвета текста
    text: {
      primary: '#1E293B', // Глубокий серо-синий для заголовков и основного текста
      secondary: '#64748B', // Светло-серо-синий для подписей, дат и мелкого текста
      disabled: '#94A3B8',
    },
    divider: '#E2E8F0', // Очень нежный цвет для границ таблиц электронного журнала
  },
  shape: {
    borderRadius: 12, // Закругленные углы в стиле шаблонов Berry/Minimal
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Отключение заглавных букв в кнопках делает интерфейс "дружелюбнее"
      fontWeight: 600,
    },
  },
  components: {
    // Кастомизация карточек (виджетов расписания, профилей)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0px 4px 20px rgba(148, 163, 184, 0.08)', // Очень мягкая, "воздушная" тень
        },
      },
    },
    // Мягкие кнопки
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(99, 102, 241, 0.2)',
          },
        },
      },
    },
  },
});

schoolTheme = responsiveFontSizes(schoolTheme);

export default schoolTheme;
