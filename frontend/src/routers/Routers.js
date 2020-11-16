import { Route, Switch } from 'react-router-dom'; 
import Authorization from '../hoc/Authorization/Authorization';

function Routers() {
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Authorization}></Route>
            </Switch>
        </main>
    )
}

export default Routers;