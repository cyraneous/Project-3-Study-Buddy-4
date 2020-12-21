import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import RegisterPage from "./pages/registerpage";
import DashboardPage from "./pages/dashboardpage";
import IndexPage from "./pages/indexpage";
import ChatroomPage from "./pages/chatroompage";
import io from "socket.io-client";
import makeToast from "./toaster";
import NavTabs from "./components/NavTabs";
import Reserve from "./pages/Reserve"
// import Login1 from "./pages/Login1"
// import { useAuth0 } from "@auth0/auth0-react";
// import { isAuthenticated } from '@auth0/auth0-react'


function App() {
    const [socket, setSocket] = React.useState(null);

    const setupSocket = () => {
        const token = localStorage.getItem("CC_Token");
        if (token && !socket) {
            const newSocket = io("http://localhost:8000", {
                query: {
                    token: localStorage.getItem("CC_Token"),
                },
            });

            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                makeToast("error", "Socket Disconnected!");
            });

            newSocket.on("connect", () => {
                makeToast("success", "Socket Connected!");
            });

            setSocket(newSocket);
        }
    };

    React.useEffect(() => {
        setupSocket();
        //eslint-disable-next-line
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={IndexPage} exact />

                <Route
                    path="/login"
                    render={() => <LoginPage setupSocket={setupSocket} />}
                    exact
                />

                <Route path="/register" component={RegisterPage} exact />
                <Route
                    path="/dashboard"
                    render={() => <DashboardPage socket={socket} />}
                    exact
                />

                <Route
                    path="/chatroom/:id"
                    render={() => <ChatroomPage socket={socket} />}
                    exact
                />

                <div>
                    <NavTabs />
                    <Route path="/reserve" component={Reserve} />
                    <Route path='/chatroompage' component={ChatroomPage} />
                    <Route path='/loginpage' component={LoginPage} />
                    <Route path='/registerpage' component={RegisterPage} />
                    <Route path='/dashboard' component={DashboardPage} />
                    {/* <Route path='/login1' component={Login1} /> */}


                </div>

            </Switch>
        </BrowserRouter>
    );


}

export default App;
