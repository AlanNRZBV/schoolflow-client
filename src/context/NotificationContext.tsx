import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from 'react';
import { Snackbar, Alert, AlertTitle, type AlertColor } from '@mui/material';

export interface NotificationOptions {
  title?: string;
  message: string;
  severity?: AlertColor;
}

interface NotificationContextType {
  showNotification: (options: NotificationOptions) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationOptions>({
    message: '',
    severity: 'info',
  });

  const showNotification = useCallback((options: NotificationOptions) => {
    setNotification({
      title: options.title,
      message: options.message,
      severity: options.severity || 'info',
    });
    setOpen(true);
  }, []);

  const closeNotification = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}
    >
      {children}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          variant="filled"
          sx={{
            width: '100%',
            minWidth: '300px',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          {notification.title && (
            <AlertTitle sx={{ fontWeight: 600 }}>
              {notification.title}
            </AlertTitle>
          )}
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification должен использоваться внутри NotificationProvider'
    );
  }

  return context;
};
