import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavigateNext } from '@mui/icons-material';
import * as Styled from './card.styles';

export default function BasicCard() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = [
    'New user details',
    'Select model user',
    'Select General access',
    'Select Elevated access',
    'Confirmation',
  ];

  return (
    <Styled.Container>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <ul className='progress'>
            {steps?.map((step: string, index: number) => {
              return (
                <li
                  className={index === activeStep ? 'completed' : 'incompleted'}
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={
                      index === activeStep ||
                      index === activeStep - 1 ||
                      index === steps.length - 1
                        ? 'content'
                        : 'content addi'
                    }
                  >
                    <span style={{ fontWeight: '500' }}> {step}</span>
                    <span style={{ fontSize: '13px' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                      eiusmod.
                    </span>
                  </div>
                  {index !== steps.length - 1 && (
                    <div className='diagonal'></div>
                  )}
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardContent>
          <Box style={{ height: '70vh' }}>
            <Typography
              sx={{ fontSize: 14, padding: '50px' }}
              color='text.secondary'
              gutterBottom
            ></Typography>
          </Box>
        </CardContent>
        <div className='divider___max-x'></div>
        <CardActions>
          <div className='btn-container'>
            <Button style={{ color: '#3a765a' }}>Cancel</Button>
            <div className='last-container'>
              {activeStep !== 0 && (
                <Button
                  variant='outlined'
                  style={{ color: '#3a765a', borderColor: '#3a765a' }}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Previous
                </Button>
              )}
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    return;
                  }
                  setActiveStep(activeStep + 1);
                }}
                endIcon={<NavigateNext />}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </CardActions>
      </Card>
    </Styled.Container>
  );
}
