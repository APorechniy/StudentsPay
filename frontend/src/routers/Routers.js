import { Route, Switch } from 'react-router-dom'; 
import Main from '../hoc/Main/Main';
import Dashboard from '../hoc/Dashboard/Dashboard';

function Routers(props) {
    const isAuth = props.isAuth;
    
    return (
        <main>
            <Switch>
                <Route exact path='/' render={() => isAuth ? <Dashboard isAuth={isAuth} /> : <Main />}></Route>
                <Route exact path='/dashboard' render={() => <Dashboard isAuth={isAuth} />}></Route>
            </Switch>
        </main>
    )
}

export default Routers;