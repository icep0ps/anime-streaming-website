import React, { useState } from 'react';

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
        <button>create account</button>
      </form>
    </div>
  );
};

export default Signup;
