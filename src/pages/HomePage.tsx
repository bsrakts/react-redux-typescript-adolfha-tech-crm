import React, { useState } from 'react'
import Navbar from '../components/navbar'
import UsersTable from '../components/usersTable'

const HomePage:React.FC = () => {
  const [activePage, setActivePage] = useState<string>('welcome')

  return (
    <div>
      <Navbar/>
      <UsersTable setActivePage={setActivePage}/>
    </div>
  )
}

export default HomePage