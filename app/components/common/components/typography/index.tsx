'use client';

import * as React from 'react';
import { Typography } from '@mui/material';

type WorkItemsPageTypes = {
  title: string;
  variant?: any;
};

export default function RenderTypography({
  title,
  variant = 'body2',
}: WorkItemsPageTypes) {
  return (
    <>
      <Typography
        variant={variant}
        gutterBottom
        style={{
          color: '#246099',
          textWrap: 'balance',
          fontWeight: '500',
        }}
      >
        {title}
      </Typography>
    </>
  );
}
