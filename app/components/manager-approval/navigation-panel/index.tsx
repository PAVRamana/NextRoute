import * as React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import { styled } from '@mui/material/styles';
import * as Styled from './navigationPanel.styles';

type NavigationPanelTypes = {
  activeStep: number;
  changeCurrentStep: (step: number) => void;
};

export default function NavigationPanel({
  activeStep,
  changeCurrentStep,
}: NavigationPanelTypes) {
  const [currentStepValue, setCurrentStepValue] = React.useState<string>('0');

  const { approvalsData } = useAppSelectorHook();
  const { step1Info, step2Info, step3Info, step4Info } = approvalsData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stepValue = (event.target as HTMLInputElement).value;
    setCurrentStepValue((event.target as HTMLInputElement).value);
    changeCurrentStep(parseInt(stepValue));
  };

  React.useEffect(() => {
    setCurrentStepValue(activeStep.toString());
  }, [activeStep]);

  const isDisabled = (index: number): boolean => {
    if (index === 0) {
      return false;
    } else if (index === 1) {
      return Object.keys(step1Info?.newJoinerInfo)?.length === 0;
    } else if (index === 2) {
      return (
        Object.keys(step2Info?.selectedModalData)?.length === 0 ||
        Object.keys(step2Info?.selectedManagerInfo)?.length === 0
      );
    } else if (index === 3) {
      return true;
    } else if (index === 4) {
      return true;
    }
    return false;
  };

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark'
          ? 'rgba(57,75,89,.5)'
          : 'rgba(206,217,224,.5)',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });

  function BpRadio(props: RadioProps) {
    return (
      <Radio
        disableRipple
        color='default'
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }

  return (
    <Styled.Container>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby='navigation-radio-group'
          name='row-navigation-radio-group'
          value={currentStepValue}
          onChange={handleChange}
        >
          {[...Array(5)].map((_step: number, index: number) => {
            return (
              <div key={index}>
                {isDisabled(index) ? (
                  <FormControlLabel
                    value='disabled'
                    disabled
                    control={<BpRadio />}
                    label=''
                  />
                ) : (
                  <FormControlLabel
                    value={index}
                    control={<Radio color='default' />}
                    label={''}
                  />
                )}
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
    </Styled.Container>
  );
}
