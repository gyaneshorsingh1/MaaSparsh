import React from 'react';
import "./CheckoutSteps.css";
import { Typography, Stepper, StepLabel, Step } from "@mui/material"; 
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CheckoutSteps = ({activeStep}) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
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
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} className='checkout-status'>
      {steps.map((item, index) => (
        <Step key={index} active={activeStep === index} completed={activeStep >= index}>
          <StepLabel
            StepIconProps={{
              style: {
                color: activeStep >= index ? "#7A301B" : "rgba(0, 0, 0, 0.649)",
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
