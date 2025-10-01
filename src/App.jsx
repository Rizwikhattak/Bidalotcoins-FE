import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ALL_ROUTES } from "./routes";
import SidebarLayout from "./components/layout/SidebarLayout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {ALL_ROUTES.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={
                item.withSidebar ? (
                  <SidebarLayout>
                    <item.component />
                  </SidebarLayout>
                ) : (
                  <item.component />
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default App;
