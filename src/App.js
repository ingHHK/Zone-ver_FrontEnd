import React, { useState, useRef, useEffect } from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';
import axios from 'axios';
import Tr from './Tr';
import Post from './Post';
import Modal from './Modal';
import Scoresend from './Scoresend';


const App = () => {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState([]);
  const [selected] = useState('');
  const [modalOn, setModalOn] = useState(false);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(11);

  //더미 데이터 호출
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSave = (data) => {
    //데이터 수정하기
    if (data.id) { //수정 데이터에는 id가 존재
      setInfo(
        info.map(row => data.id === row.id ? {
          id: data.id,
          name: data.name,
        } : row))

    } else { //바로 추가하기
      // 데이터 추가하기 방법1
      // setInfo((prev) => {
      //   return [ ...prev, {
      //     id: nextId.current,
      //     name: data.name,
      //     email: data.email,
      //     phone: data.phone,
      //     website: data.website
      //   }]
      // });

      //데이터 추가하기 방법2
      setInfo(info => info.concat(
        {
          id: nextId.current,
          name: data.name,
        }
      ))
      nextId.current += 1;
    }
  }

  const handleCancel = () => {
    setModalOn(false);
  }

  const handleEditSubmit = (item) => {
    console.log(item);
    handleSave(item);
    setModalOn(false);
  }


  return (
    <section className="text-gray-800 body-font relative">
      <ParticlesBg type="circle" bg={true} />
      <Scoresend />
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/2 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto w-full mt-10 md:mt-0 relative z-10 border border-gray-200 shadow-md">
          <h1 className="text-indigo-600 text-2xl mb-1 font-medium title-font text-center">
            Ranking
          </h1>
          <div className="flex-auto flex-shrink-0 space-x-2">
            <input
              className="bg-white rounded border w-3/4 border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-2 py-2 mb-4"
              placeholder="검색어 입력"
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
            />

            <button className="text-white bg-indigo-500 border-0 w-1/5 py-2 px-4 mb-4 focus:outline-none hover:bg-indigo-600 rounded text-base">
              검색
            </button>
          </div>

          <div className="container max-w-screen-lg mx-auto">
            <div className="text-xl font-bold mt-5 mb-3 text-center">집콕 랭킹정보 리스트</div>

            <table className="min-w-full table-auto text-gray-800">

              <thead className="justify-between">

                <tr className="bg-gray-800">

                  <th className="text-gray-300 px-4 py-3"> Rank </th>
                  <th className="text-gray-300 px-4 py-3"> Name </th>
                  <th className="text-gray-300 px-4 py-3"> Score </th>

                </tr>

              </thead>
              <Tr info={info} />
            </table>
            <Post onSaveData={handleSave} />
            {modalOn && <Modal selectedData={selected} handleCancel={handleCancel}
              handleEditSubmit={handleEditSubmit} />}
          </div>

          <a
            className="text-center sm:text-left"
            href="https://docs.microsoft.com/en-us/learn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-white bg-indigo-500 border-0 w-full mt-5 py-2 px-20 focus:outline-none hover:bg-indigo-600 rounded text-base animate-bounce mt-2">
              랭킹 더보기
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default App;