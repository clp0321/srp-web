import React from 'react';
import Contain from '@/components/EntryContain';

const EntryLaout = ({ children }) => {
  return (
    <>
      <Contain>{children}</Contain>
    </>
  );
};

export default EntryLaout;
