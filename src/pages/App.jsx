import './App.css';

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { MainPage } from '../components/MainPage';

import { PageProvider } from '../context/GlobalContext';
import { Register } from './register';
import { Login } from './login';
import { Unsuscribe } from './unsuscribe';



function App() {
    return (
            <BrowserRouter>
                <PageProvider>
                    <Switch>
                        <Route exact path='/Admin' component={Login} />
                        <Route exact path='/' component={Register} />
                        <Route exact path='/Unsuscribe' component={Unsuscribe} />

                        <Route exact path='/Admin/:component' component={MainPage} />

                    </Switch>
                </PageProvider>
            </BrowserRouter>
    );
}

export default App;
