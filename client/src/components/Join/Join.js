import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';
const Join = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Join</h1>
        <div>
          <input
            placeholder='Name required'
            className='joinInput'
            type='text'
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          ></input>
          <input
            placeholder='Room required'
            className='joinInput'
            type='text'
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            required
          ></input>
        </div>
        <Link to={`/chat?name=${name}&room=${room}`}>
          <button
            className='button mt-20'
            type='submit'
            disabled={!name || !room}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
