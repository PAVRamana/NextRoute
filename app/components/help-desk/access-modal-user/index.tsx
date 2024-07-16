'use client';

import CircularProgress from '@mui/material/CircularProgress';
import { Autocomplete, TextField, Typography } from '@mui/material';
import * as React from 'react';
import * as Styled from './accessModalUserSection.styles';
import RenderTypography from '../../common/components/typography';

interface ManagerType {
  title: string;
  year: number;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const managerData = [
  { title: 'Sheila Thompson', year: 1994 },
  { title: 'Joseph Erwin', year: 1972 },
  { title: 'Dave Hayes', year: 1974 },
  { title: 'Test Manager ', year: 2008 },
  { title: 'Alex Sam', year: 1994 },
];

export default function AccessModalUserSection() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ManagerType[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3);
      if (active) {
        setOptions([...managerData]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Styled.Container>
      <Typography variant='button' display='block' gutterBottom>
        Override Manager Approval
      </Typography>
      <Styled.AccessModalUserSection>
        <Styled.FieldContainer>
          <RenderTypography title={'Manager Approval'} />
          <TextField
            label=''
            style={{ width: '300px' }}
            size='small'
            variant='outlined'
            value={'Mario Marrota'}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Styled.FieldContainer>
        <Styled.FieldContainer>
          <RenderTypography title={'Overring Manager Approval'} />
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            size='small'
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=''
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Styled.FieldContainer>
      </Styled.AccessModalUserSection>
      <Styled.FieldContainer>
        <RenderTypography title={'Additional Comment'} />
        <TextField
          label=''
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          rows={2}
          maxRows={4}
          sx={{ width: 500 }}
        />
      </Styled.FieldContainer>
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}
