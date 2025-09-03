import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleAuth = (user) => {
    onAuth(user);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {isLogin ? (
          <Login 
            onLogin={handleAuth}
            switchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <Signup 
            onSignup={handleAuth}
            switchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
