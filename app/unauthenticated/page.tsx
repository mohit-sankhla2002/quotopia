import React from 'react';

const UnauthenticatedPage = () => {
  return (
    <div className="h-screen flex flex-col justify-start items-center py-10">
      <h1 className="text-4xl underline underline-offset-4 font-bold mb-6 font-satoshi">Access Denied! Please Sign in first</h1>
    </div>
  );
};

export default UnauthenticatedPage;