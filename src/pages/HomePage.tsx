import React, { useState } from 'react'
import UsersTable from '../components/usersTable'
import { Navbar } from '../components/navbar'
import PageTitle from '../components/pageTitle'

const HomePage:React.FC = () => {
  const [activeItem, setActiveItem] = useState('welcome')
  console.log(activeItem, "activeItem")

  return (
    <div>
      <Navbar setActiveItem={setActiveItem}/>
      <div className='w-full px-[7.4rem] max-h-[90vh] overflow-y-hidden flex flex-col justify-center mt-8'>
      <PageTitle text={activeItem}/>
      <UsersTable/>
      </div>
    </div>
  )
}

export default HomePage