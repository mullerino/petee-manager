import { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider} from 'react-query';

const QueryClientContext = createContext();

export const QueryClientContextProvider = ({ children }) => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientContext.Provider value={{queryClientInstance: queryClient}}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
};

export const useQueryClient = () => useContext(QueryClientContext)
