'use client';

import CircularProgress from '@mui/material/CircularProgress';
import EastIcon from '@mui/icons-material/East';
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import * as Styled from './accessModalUserSection.styles';
import InstructionsNote from '../../common/instructions-note';
import DropDown from '../../common/components/dropdown';
import RenderTypography from '../../common/components/typography';
import { useAppDispatch } from '../../common/service/redux/store';
import { setStep2Info } from '../../common/service/redux/slices/approvalsSlice';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';

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

  const dispatch = useAppDispatch();
  const { approvalsData } = useAppSelectorHook();
  const { step2Info } = approvalsData;
  const { selectedModalData, selectedManagerInfo } = step2Info;

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
      <InstructionsNote
        title='SELECT MODEL USER'
        notes={[
          'To get started, fill out the 2 fields below.',
          'When done, select the green button at the bottom.',
        ]}
      />
      <Styled.AccessModalUserSection>
        <Styled.FieldContainer>
          <RenderTypography title={'Select Access Model User/Access Options'} />
          <DropDown
            data={[
              'Copy Access from Model Users',
              'Revoke Access from Model Users',
            ]}
            value={selectedModalData.modelUser ?? ''}
            width={300}
            size='small'
            onChange={(value: string) => {
              dispatch(
                setStep2Info({
                  data: {
                    ...step2Info,
                    selectedModalData: { modelUser: value },
                  },
                })
              );
            }}
          />
        </Styled.FieldContainer>
        <Styled.FieldContainer>
          <RenderTypography title={'Enter Access Model User'} />
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={
              Object.keys(selectedManagerInfo)?.length > 0
                ? selectedManagerInfo
                : undefined
            }
            size='small'
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            disableClearable={true}
            getOptionLabel={(option) => option.title}
            onChange={(_event, value: any) => {
              dispatch(
                setStep2Info({
                  data: {
                    ...step2Info,
                    selectedManagerInfo: value,
                  },
                })
              );
            }}
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
      {selectedModalData.modelUser &&
        Object.keys(selectedManagerInfo)?.length > 0 && (
          <Styled.SelectedModal>
            <Typography variant='body1' gutterBottom>
              {selectedModalData.modelUser}
            </Typography>
            <EastIcon style={{ color: '#246099' }} />
            <Typography variant='body1' gutterBottom>
              {(selectedManagerInfo as any)?.title}
            </Typography>
          </Styled.SelectedModal>
        )}
      <Styled.Line />

      <Styled.FieldContainer>
        <RenderTypography title={'Note:'} />
        <Typography variant='body2' gutterBottom>
          You are requesting access for new hire Dave Matheson. If you would
          like to get further notifications for this request, opt in below.
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography variant='caption'>
              INCLUDE ME IN FUTURE NOTIFICATIONS
            </Typography>
          }
        />
      </Styled.FieldContainer>
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}
