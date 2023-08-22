import "./App.css";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Layout from "./Pages/Layout";
import CreatePost from "./Pages/CreatePost";
import IndexPage from "./Pages/IndexPage";
import PostPage from "./Pages/PostPage";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Post from "./Components/Post";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
