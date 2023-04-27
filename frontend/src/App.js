import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from './components/error-boundary';
import { useRecoilState } from 'recoil';
import { UserAtom } from './states/userAtom';

const Page404 = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  const [userAtom, setUserAtom] = useRecoilState(UserAtom);
  const [isLoggedIn, setIsLoggedIn] = React.useState(userAtom?.loggedIn);



  return (
    <Suspense>
      <ErrorBoundary>
        <Router>
          {/* <Outlet /> */}
          <Routes>
            {/* {
              isLoggedIn ? <> */}
            {
              routes.map((route, index) => {
                return <Route key={index} path={route.path} element={route.component} />
              }
              )
            }
            {/* </> :
                <>
                  {
                    routes.map((route, index) => {
                      return <Route key={index} path={route.path} element={route.privateRoute ? <Login /> : route.component} />
                    }
                    )
                  }
                </>
            } */}
          </Routes>
        </Router>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;