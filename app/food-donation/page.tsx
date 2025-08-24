import React from 'react'
import { DonationForm } from '@/components/fooddonation/donation-form'
import { requireAuth } from '@/lib/utils'

const FoodDonationPage = async () => {
  await requireAuth()

  return (
    <div>
      <DonationForm />
    </div>
  )
}

export default FoodDonationPage
