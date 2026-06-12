import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserTicketsPage from "./pages/UserTicketsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrganizerDashboardPage from "./pages/OrganizerDashboardPage";
import AdminDashBoardPage from "./pages/AdminDashBoardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateEventPage from "./pages/CreateEventPage";
import { Toaster } from "react-hot-toast";


function App() {
  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <AppLayout>

        <Routes>

          <Route path="/" element={
            <LandingPage />
          }
          />

          <Route path="/events" element={
            <EventsPage />
          }
          />

          <Route path="/events/:id" element={
            <EventDetailsPage />
          }
          />

          <Route path="/login" element={
            <LoginPage />
          }
          />

          <Route path="/register" element={
            <RegisterPage />
          }
          />

          <Route path="/tickets"
            element={
              <ProtectedRoute
                allowedRoles={["ROLE_USER"]}>
                <UserTicketsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout/:eventId"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ROLE_USER"
                ]}
              >
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ROLE_ORGANIZER"
                ]}
              >
                <OrganizerDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ROLE_ADMIN"
                ]}
              >
                <AdminDashBoardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/events/new"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ROLE_ORGANIZER"
                ]}
              >
                <CreateEventPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/organizer/events/:id/edit"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "ROLE_ORGANIZER"
                ]}
              >
                <CreateEventPage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </AppLayout>

    </BrowserRouter>
  )
}

export default App;