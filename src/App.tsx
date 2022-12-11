import './App.css';
import { QueryClient, QueryClientProvider} from 'react-query'
import Dashboard from './views/dashboard';
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
};

export default App;
