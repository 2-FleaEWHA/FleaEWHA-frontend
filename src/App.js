import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Main from "./pages/main";
import Detail from "./pages/detail";
import ProductInform from "./pages/ProductInform";
import ProductRegister from "./pages/ProductRegister";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/productdetail" component={ProductInform} />
        <Route exact path="/productregister" component={ProductRegister} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
