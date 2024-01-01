import React from 'react';
import LoginForm from '../components/LoginForm';
import { RequireAuth }  from '../components/RequireAuth';

function LogInPage() {
    return (
        <div>
           <h2>Login</h2>
           <RequireAuth>
           <LoginForm /> 
           </RequireAuth>
        </div>
    );
}

export default LogInPage;   