import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthGuard from './components/base/auth-guard/auth-guard.component';
import Header from './components/base/header/header.component';
import NotificationProvider from './components/base/notification/notification-container/notification-container.component';
import UserProvider from './contexts/user.context';
import ElectionsPage from './pages/elections/elections.component';
import LoginPage from './pages/login/login.component';
import VotePage from './pages/vote/vote.component';
import { useState } from 'react';
import { IElection } from './interfaces';
import { ESP32Socket } from './services/esp32.service';
import RoomSetup from './pages/room-setup/room-setup.component';
import ModalProvider from './contexts/modal.context';
import UtilsProvider from './contexts/utils.context';
import ManagementPage from './pages/management/management.component';
import Verify from './components/elections/verify/verify.component';
import SettingsPage from './pages/settings/settings.component';

function App() {

  const [electionName, setElectionName] = useState<string>('');
  const [electionType, setElectionType] = useState<IElection.ElectionType>(IElection.ElectionType.FINGERPRINT);
  const [electionDescription, setElectionDescription] = useState<string>('');
  const [numberOfCandidates, setNumberOfCandidates] = useState<number>(0);
  const [electionDate, setElectionDate] = useState<IElection.Date | null>(null);
  const [maxVotes, setMaxVotes] = useState<number>(1);

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <NotificationProvider>
            <UtilsProvider>
              <ModalProvider>
                <Header></Header>
                <Routes>
                  <Route path="/verify/:verifyId" element={<Verify />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  {/* <Route path="/home" element={<HomePage />} /> */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/elections" element={<ElectionsPage />} />
                  <Route path="/elections/:id" element={<VotePage />} />
                  <Route path="/room/:id" element={<RoomSetup />} />
                  <Route path="/management" element={<Navigate to="/management/dashboard" />} />
                  <Route path="/settings" element={<Navigate to="/settings/my-details" />} />
                  <Route path="/settings/:section" element={<SettingsPage />} />
                  <Route path="/settings/:section/:id" element={<SettingsPage />} />
                  <Route path="/management/:section" element={<ManagementPage electionName={{ value: electionName, set: setElectionName }} electionType={{ value: electionType, set: setElectionType }} electionDescription={{ value: electionDescription, set: setElectionDescription }} numberOfCandidates={{ value: numberOfCandidates, set: setNumberOfCandidates }} electionDate={{ value: electionDate, set: setElectionDate }} maxVotes={{ value: maxVotes, set: setMaxVotes }} />} />
                  <Route path="/management/:section/:id" element={<ManagementPage electionName={{ value: electionName, set: setElectionName }} electionType={{ value: electionType, set: setElectionType }} electionDescription={{ value: electionDescription, set: setElectionDescription }} numberOfCandidates={{ value: numberOfCandidates, set: setNumberOfCandidates }} electionDate={{ value: electionDate, set: setElectionDate }} maxVotes={{ value: maxVotes, set: setMaxVotes }} />} />
                  {/* <Route path="/management/new-election/elections" element={<VotePage simulate={true} electionInfo={{ electionName: { value: electionName, set: setElectionName }, electionType: { value: electionType, set: setElectionType }, electionDescription: { value: electionDescription, set: setElectionDescription }, numberOfCandidates: { value: numberOfCandidates, set: setNumberOfCandidates }, electionDate: { value: electionDate, set: setElectionDate }, maxVotes: { value: maxVotes, set: setMaxVotes } }} />} /> */}
                  {/* <Route path="/machines" element={<AuthGuard><MachinesPage /></AuthGuard>} /> */}
                  {/* <Route path="/manage-food" element={<AuthGuard><ManageFoodPage /></AuthGuard>} /> */}
                  {/* <Route path="/management" element={<AuthGuard><Navigate to="/management/dashboard" /></AuthGuard>} /> */}
                  {/* <Route path="/management/:section" element={<AuthGuard><ManagementPage /></AuthGuard>} /> */}
                </Routes>
              </ModalProvider>
            </UtilsProvider>
          </NotificationProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
