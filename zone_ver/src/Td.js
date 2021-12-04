import React from 'react';

const Td = ({ item }) => {

  return (
    <>
      <tr className='"bg-white border-2 border-gray-200'>
        <td className='px-4 py-3 text-center'>{item.id}</td>
        <td className='px-4 py-3 text-center'>{item.name}</td>
      </tr>
    </>
  )
};

export default Td;