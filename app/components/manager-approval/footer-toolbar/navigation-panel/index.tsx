import * as React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useAppSelectorHook } from '../../../common/service/hook/useAppSelectorHook';
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
  const { step1Info, step2Info, step3Info, step4Info, step5Info } =
    approvalsData;

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
      return step3Info?.selectedEntitilementData?.rows?.length === 0;
    } else if (index === 4) {
      return step4Info?.selectedElevatedEntitilementData?.rows?.length === 0;
    }
    return false;
  };

  const isDataAvaialble = (index: number): boolean => {
    if (index === 1) {
      return (
        Object.keys(step2Info?.selectedModalData)?.length === 0 ||
        Object.keys(step2Info?.selectedManagerInfo)?.length === 0
      );
    } else if (index === 2) {
      return step3Info?.selectedEntitilementData?.rows?.length === 0;
    } else if (index === 3) {
      return step4Info?.selectedElevatedEntitilementData?.rows?.length === 0;
    } else if (index === 4) {
      return Object.keys(step5Info?.comfirmationDetails)?.length === 0;
    }
    return false;
  };

  const DisabledIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: '#394b59',
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  }));

  const DisabledCheckedIcon = styled(DisabledIcon)({
    backgroundColor: '#137cbd',
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });

  function DisabledRadio(props: RadioProps) {
    return (
      <Radio
        disableRipple
        color='default'
        checkedIcon={<DisabledCheckedIcon />}
        icon={<DisabledIcon />}
        {...props}
      />
    );
  }

  const SuccessIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: '#3A765A',
    'input:hover ~ &': {
      backgroundColor: '#3A765A',
    },
  }));

  const SuccessCheckedIcon = styled(SuccessIcon)({
    backgroundColor: '#3A765A',
    'input:hover ~ &': {
      backgroundColor: '#3A765A',
    },
  });

  function SuccessRadio(props: RadioProps) {
    return (
      <Radio
        disableRipple
        color='default'
        checkedIcon={<SuccessCheckedIcon />}
        icon={<SuccessIcon />}
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
                    control={<DisabledRadio />}
                    label=''
                  />
                ) : activeStep === index ? (
                  <FormControlLabel
                    value={index}
                    control={
                      <Radio
                        sx={{
                          color: '#246099',
                          '&.Mui-checked': {
                            color: '#246099',
                          },
                        }}
                      />
                    }
                    label={''}
                  />
                ) : isDataAvaialble(index) ? (
                  <FormControlLabel
                    value={index}
                    control={<Radio />}
                    label={''}
                  />
                ) : (
                  <FormControlLabel
                    value={index}
                    control={<SuccessRadio />}
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
