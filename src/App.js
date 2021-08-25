import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import Main from './pages/Main';
import Detail from './pages/Detail';
import ProductInform from './pages/ProductInform';
import ProductRegister from './pages/ProductRegister';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/productdetail/:no" component={ProductInform} />
        <Route exact path="/productregister" component={ProductRegister} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
