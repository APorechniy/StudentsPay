import { BrowserRouter } from 'react-router-dom';

import Routers from './routers/Routers';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  let isAuth = Boolean(localStorage.getItem("uuid"));
  return (
    <div>
      { isAuth ? <Sidebar /> : null }
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
