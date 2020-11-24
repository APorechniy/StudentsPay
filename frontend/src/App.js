import { BrowserRouter } from 'react-router-dom';

import Routers from './routers/Routers';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  function getCookie() {
    let cookies = document.cookie.split(";");

    let res = cookies.map((str) => {
      let substr = str.split("=");
      return {
        name: substr[0],
        val: substr[1]
      }
    })

    let result = false;
    res.forEach((str) => {
      if(str.name === " uuid") {
        result = str
      }
    });

    return result
  };

  let isAuth = getCookie();
  
  
  return (
    <div>
      { isAuth ? <Sidebar /> : null }
      <BrowserRouter>
        <Routers isAuth={isAuth}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
