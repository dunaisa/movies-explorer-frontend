import { Route, Switch, Link, useHistory } from 'react-router-dom';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Header from '../Header/Header'
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';

function App() {

  const history = useHistory();

  const handleOnRegister = ({ name, email, password }) => {
    if ({ name, email, password }) {
      history.push('/signin');
    }
  }

  const handleOnLogin = ({ name, email, password }) => {
    if ({ name, email, password }) {
      history.push('/movies');
    }
  }

  return (
    <Switch>
      <Route exact path="/">
        <Header headerClassName="header header_type_intro">
          <ul className="header__items">
            <li className="header__item">
              <Link className="header__link header__link_type_signup" to="/signup">Регистрация</Link>
            </li>

            <li className="header__item">
              <Link className="header__link header__link_type_signin" to="/signin">Войти</Link>
            </li>
          </ul>
        </Header>
        <Main />
        <Footer />
      </Route>

      <Route exact path="/signin">
        <Login onLogin={handleOnLogin} />
      </Route>

      <Route exact path="/signup">
        <Register onRegister={handleOnRegister} />
      </Route>

      <Route exact path="/movies">
        <Movies />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

    </Switch>


  );
}

export default App;
