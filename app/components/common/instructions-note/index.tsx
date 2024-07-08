'use client';

import { Typography } from '@mui/material';
import * as React from 'react';
import * as Styled from './InstructionsNote.styles';

type InstructionsNoteTypes = {
  title: string;
  notes: string[];
};

export default function InstructionsNote({
  title,
  notes,
}: InstructionsNoteTypes) {
  return (
    <>
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <Styled.Line />
      <Styled.InstructionSelction>
        <Typography variant='button' display='block' gutterBottom>
          INSTRUCTIONS
        </Typography>
        <Styled.InstructionContentConatiner>
          {notes?.map((note: string, index: number) => {
            return (
              <div key={index}>
                <Typography variant='body2' gutterBottom>
                  {`${index + 1}. ${note}`}
                </Typography>
              </div>
            );
          })}
        </Styled.InstructionContentConatiner>
      </Styled.InstructionSelction>
    </>
  );
}
