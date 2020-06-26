import React from 'react';
import './styles.scss';

import Spinner from 'react-spinners/BounceLoader';

const Loading = ({ size, back }) => {
  return (
    <div className={`${back ? 'loading' : ''}`}>
      <Spinner size={size} color={'rgb(0,100,255)'} />
    </div>
  );
};

export default Loading;
