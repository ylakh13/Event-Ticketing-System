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


function App() {
  return(

    <BrowserRouter>
    
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

        <Route path="/tickets" element={
            <UserTicketsPage />
        }
        />

        <Route path="/checkout/:eventId" element={
            <CheckoutPage />
        }
        />

        <Route path="/organizer" element={
            <OrganizerDashboardPage />
        }
        />

        <Route path="/admin" element={ 
          <AdminDashBoardPage />
        }
        />

      </Routes>

    </AppLayout> 

    </BrowserRouter>
  )
}

export default App;