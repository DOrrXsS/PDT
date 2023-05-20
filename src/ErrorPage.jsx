import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const err = useRouteError();
  return (
    <div>
      <h1>Errors</h1>
      <p>{err.statusText || err.message}</p>
    </div>
  )
}
