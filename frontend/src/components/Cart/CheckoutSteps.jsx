import React from 'react';
import "./CheckoutSteps.css";
import {Typography, Stepper, StepLabel, Step} from "@material-ui/core";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    }

  return (
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
      {steps.map((item, index) => (
        <Step key={index} active={activeStep === index} completed={activeStep >= index}>
          <StepLabel
            StepIconProps={{
              style: {
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }
            }}
          >
            {item.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default CheckoutSteps;
