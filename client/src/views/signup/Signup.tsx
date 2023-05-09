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
    <div className="w-1/2 flex flex-col gap-5 h-full">
      <div className=" mt-60">
        <h1 className="text-2xl">
          <h1 className="text-sm">
            {type === 'signin' ? ' Weclome back!' : ' Weclome to forge!'}{' '}
          </h1>
          {type === 'signin' ? 'Please sign in' : 'Create account'}
        </h1>
        <form action={action} method="post" className="flex flex-col gap-5">
          <label htmlFor="username" className="flex flex-col gap-2">
            Email:
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 bg-thirdBg text-sm rounded-lg "
            />
          </label>

          <label htmlFor="username" className="flex flex-col gap-2">
            Password:
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-thirdBg text-sm rounded-lg "
            />
          </label>

          <button className="bg-main p-2 rounded-lg">
            {type === 'signin' ? 'Login' : 'Create an account'}
          </button>
          {type === 'signin' ? (
            <div>
              <h1 className="text-xs">Dont have an account ?</h1>
              <Link to={'/signup'}>
                <button className="font-bold hover:text-main"> Create an account</button>
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="text-xs">Already have an account ?</h1>
              <Link to={'/signin'}>
                <button className="font-bold hover:text-main">Log in</button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
