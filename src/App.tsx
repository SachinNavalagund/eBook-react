import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Container from "./components/common/Container";
import Verify from "./views/Verify";
import NewUser from "./views/NewUser";
import { Toaster } from "react-hot-toast";
import Profile from "./views/Profile";
import UpdateProfile from "./views/UpdateProfile";
import Private from "./routes/Private";
import Guest from "./routes/Guest";

interface Props {}

const App: FC<Props> = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/verify" element={<Verify />}></Route>

        <Route element={<Private />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/update-profile" element={<UpdateProfile />}></Route>
          <Route path="/new-user" element={<NewUser />}></Route>
        </Route>

        <Route element={<Guest />}>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </Container>
  );
};

export default App;
