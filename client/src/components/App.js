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
import ProfileBookPage from "./views/ProfilePage/ProfileBook";
import DeleteUserPage from "./views/ProfilePage/DeleteUser";
import SearchPage from "./views/Searchpage/SearchPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Route exact path="/" component={Auth(LandingPage, null)} />
      <div
        style={{
          paddingRight: "15%",
          paddingLeft: "15%",
          paddingTop: "80px",
          minHeight: "calc(100vh - 80px)"
        }}
      >
        <Switch>
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
          <Route exact path="/profilebook" component={Auth(ProfileBookPage, true)} />
          <Route exact path="/delete" component={Auth(DeleteUserPage, true)} />
          <Route
            exact
            path="/search"
            component={Auth(SearchPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
