import RoutesApp from './routes';
import { ModalProvider } from './contexts/modalForm';
import { QueryClientContextProvider } from './contexts/useQuery';
import { NotificationProvider } from './contexts/notification';
import { FormProvider } from './contexts/form';

function App() {
  return (
    <QueryClientContextProvider>
      <FormProvider>
        <NotificationProvider>
          <ModalProvider>
            <RoutesApp />
          </ModalProvider>
        </NotificationProvider>
      </FormProvider>
    </QueryClientContextProvider>
  )
}

export default App
