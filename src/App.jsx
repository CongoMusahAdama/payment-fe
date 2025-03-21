import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Transfer from './components/Transfer';
import TransactionHistory from './components/TransactionHistory';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/transactions" element={<TransactionHistory />} />
            </Routes>
        </Router>
    );
};

export default App;
