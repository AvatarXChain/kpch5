import React from 'react';
import withRouter from 'umi/withRouter';

const Layout = ({ children, location }) => {
  return (
    <div className={'container'}>
      {children}
    </div>
  );
}

export default withRouter(Layout);
