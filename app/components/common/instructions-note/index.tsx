'use client';

import { Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import * as Styled from './InstructionsNote.styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Body1Typography } from '../components/typography';

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
      <Styled.InstructionSelction>
        <Body1Typography title={title} />
        <Tooltip
          placement='bottom-end'
          title={
            <>
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
            </>
          }
        >
          <InfoOutlinedIcon
            style={{ width: '20px', height: '17px', margin: '2px 0px' }}
          />
        </Tooltip>
      </Styled.InstructionSelction>
    </>
  );
}
