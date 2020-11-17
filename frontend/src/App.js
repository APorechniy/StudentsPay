import { BrowserRouter } from 'react-router-dom';

import Routers from './routers/Routers';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div>
      <Sidebar />
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
