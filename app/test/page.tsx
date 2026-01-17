import React from 'react'
import { testScriptGenerator } from './actions'

export default async function Page() {
    await testScriptGenerator()
  return (
    <div>Check terminal logs</div>
  )
}
