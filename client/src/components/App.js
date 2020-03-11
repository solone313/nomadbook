import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import BookUploadPage from "./views/BookUploadPage/BookUploadPage";
import BookDetailPage from "./views/BookDetailPage/BookDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/book/upload"
            component={Auth(BookUploadPage, true)}
          />
          <Route
            exact
            path="/book/:bookId"
            component={Auth(BookDetailPage, null)}
          />
          <Route
            exact
            path="/subscription"
            component={Auth(SubscriptionPage, true)}
          />
          <Route exact path="/profile" component={Auth(ProfilePage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
