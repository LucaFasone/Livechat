import { useAuth } from '@/hooks/useAuth';
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div> 
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/chatPage'>chatPage</Link>


    </div >

  )
}

