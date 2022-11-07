import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Register from "../Register/Register";
import Login from "../Login/Login";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Header from '../Header/Header'

function App() {
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

      <Route exact path="/signin" component={Login} />
      <Route exact path="/signup" component={Register} />
    </Switch>


  );
}

export default App;
