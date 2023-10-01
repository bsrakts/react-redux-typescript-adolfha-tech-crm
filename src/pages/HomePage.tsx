import React, { useState } from 'react'
import UsersTable from '../components/User/usersTable'
import { Navbar } from '../components/Navbar/navbar'
import PageTitle from '../components/pageTitle'
import TodosTable from '../components/Todo/todosTable'
import { ProductsLineChart } from '../components/Products/productsLineChart'

const HomePage:React.FC = () => {
  const [activeItem, setActiveItem] = useState('Welcome')
  console.log(activeItem, "activeItem")

  return (
    <div>
      <Navbar setActiveItem={setActiveItem}/>
      <div className='w-full px-[7.4rem] max-h-[90vh] overflow-y-hidden flex flex-col justify-center mt-8'>
      <PageTitle text={activeItem}/>
      {activeItem === 'Welcome' && <ProductsLineChart/>}
      {activeItem === 'User List' && <UsersTable/>}
      {activeItem === 'Todos' && <TodosTable/>}
      </div>
    </div>
  )
}

export default HomePage