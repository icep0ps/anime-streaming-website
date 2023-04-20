import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  action: string;
  type: 'signin' | 'signup';
};

const Signup = ({ action, type }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form action={action} method="post" className="flex flex-col">
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="username">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>{type === 'signin' ? 'Login' : 'Create an account'}</button>
        {type === 'signin' ? (
          <div>
            <h1>Dont have an account ?</h1>
            <Link to={'/signup'}>
              <button> Create an account</button>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Already have an account ?</h1>
            <Link to={'/signin'}>
              <button>Login</button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
