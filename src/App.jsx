import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ALL_ROUTES } from "./routes";
import SidebarLayout from "./components/layout/SidebarLayout";
import NotFoundPage from "./pages/NotFound/Page";

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
