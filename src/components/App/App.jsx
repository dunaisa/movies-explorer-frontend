import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import Register from "../Register/Register";
import Login from "../Login/Login";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Header from '../Header/Header'

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
        <Header>
          <Link className="header__link header__link_type_signup" to="/signup">Регистрация</Link>
          <Link className="header__link header__link_type_signin" to="/signin">Войти</Link>
        </Header>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </Route>

      <Route exact path="/signin">
        <Login onLogin={handleOnLogin} />
      </Route>

      <Route exact path="/signup">
        <Register onRegister={handleOnRegister} />
      </Route>

    </Switch>


  );
}

export default App;
