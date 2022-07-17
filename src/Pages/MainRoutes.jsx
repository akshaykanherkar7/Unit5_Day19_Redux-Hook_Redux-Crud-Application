import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import SignUp from "./SignUp";
import { Routes, Route } from "react-router-dom";
import ReqAuth from "../Components/ReqAuth";
import Sidebar from "../Components/Sidebar";
import { Stack } from "@chakra-ui/react";
import Editpage from "./Editpage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ReqAuth>
            <Stack direction="row">
              <Sidebar></Sidebar>
              <Homepage />
            </Stack>
          </ReqAuth>
        }
      ></Route>
      <Route
        path="/task/:id"
        element={
          <ReqAuth>
            <Stack direction="row">
              <Sidebar></Sidebar>
              <Editpage />
            </Stack>
          </ReqAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  );
};

export default MainRoutes;
