'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='text-center text-xl my-8'>
      <h2>Something went wrong!</h2>
      <button
        className='bg-slate-300 p-4 my-4 text-base rounded'
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}