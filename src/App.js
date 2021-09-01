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
import MyPage from './pages/Login/MyPage';
import Chat2 from './pages/Chat2/Chat2';
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
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/chat" component={Chat2}/>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
