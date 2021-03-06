import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'
import Header from './component/common/Header';
import Footer from './component/common/Footer';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Search from './pages/Search';
import ProductInform from './pages/ProductInform';
import ProductRegister from './pages/ProductRegister';
import ProductEdit from './pages/ProductEdit';
import MyPage from './pages/Login/MyPage';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/detail/:keyword" component={Search} />
        <Route exact path="/productdetail/:no" component={ProductInform} />
        <Route exact path="/productregister" component={ProductRegister} />
        <Route exact path="/edit/:productID" component={ProductEdit} />
        <Route exact path="/mypage" component={MyPage}/>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
