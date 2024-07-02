'use client';

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function FullPageLoader() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <CircularProgress style={{ color: '#19374d' }} />
    </div>
  );
}
