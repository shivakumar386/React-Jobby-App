import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'
import Profile from './components/Profile/Profile'
import JobDetails from './components/JobDetails/JobDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
  </Switch>
)

export default App
