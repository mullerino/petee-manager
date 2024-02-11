import { QueryClient, QueryClientProvider } from 'react-query';
import RoutesApp from './routes';
import { ModalProvider } from './contexts/modalForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RoutesApp/>
      </ModalProvider>
    </QueryClientProvider>
  )
}

export default App
