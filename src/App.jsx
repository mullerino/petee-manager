import RoutesApp from './routes';
import { ModalProvider } from './contexts/modalForm';
import { QueryClientContextProvider } from './contexts/useQuery';
import { NotificationProvider } from './contexts/notification';

function App() {
  return (
    <QueryClientContextProvider>
      <NotificationProvider>
        <ModalProvider>
          <RoutesApp />
        </ModalProvider>
      </NotificationProvider>
    </QueryClientContextProvider>
  )
}

export default App
