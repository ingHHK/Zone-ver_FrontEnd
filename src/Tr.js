import React from 'react';
import Td from './Td';


const Tr = ({ info }) => {
  return (
    <tbody >
      {

        <Td key={info.id} item={info} />
      }
    </tbody>
  );
};

export default Tr;