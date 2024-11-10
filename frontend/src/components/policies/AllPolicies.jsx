import React from 'react'
import ShippingPolicy from './ShippingPolicy'
import CancellationPolicy from './CancellationPolicy'
import ReturnPolicy from './ReturnPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import CashOnDelivery from './CashOnDelivery'

const AllPolicies = () => {
  return (
    <>
      <ShippingPolicy />
      <CancellationPolicy />
      <ReturnPolicy />
      <PrivacyPolicy />
      <CashOnDelivery />

    </>
  )
}

export default AllPolicies
