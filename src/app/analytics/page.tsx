import { analytics } from '@/utils/analytics'
import React from 'react'

const Analytics = async () => {
  const data = await analytics.retrieve("pageView", '29/02/2024')

  return(
    <p className='text-white'>{JSON.stringify(data)}</p>
  )
  
}

export default Analytics 