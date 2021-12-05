import React, { useState } from 'react';

var user_name;
var user_score;

//"name","score"를 DB에 Push
function Push_Data(name, score) {
  user_name = name;
  user_score = score;

  fetch('/api/Push-HttpTrigger', {
      method: 'POST',
      headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
      },
      body: JSON.stringify({
      name: user_name,
      score: user_score
      })
  })
  .then(function(response)
  {
      if (response.status === 200) {
          //response.text().then(text => updateUI(text)); 
      } else {
      }
  })
}

const Post = ({ onSaveData }) => {
  const [form, setForm] = useState({
    name: '',
    score:''
  });

  const handleChange = (e) => {
    const { name, value1, score, value2 } = e.target;
    setForm({
      ...form,
      [name]: value1,
      [score]: value2
    })
  };

  const handleChange2 = (e) => {
    const { score, value } = e.target;
    setForm({
      ...form,
      [score]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveData(form)
    console.log(form);
    setForm({
      name: '',
      score:''
    })
  }

  return (
    <>
      <div className='text-xl font-bold mt-5 mb-2 text-center'>랭킹 사람 추가하기</div>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row mb-1">
          <label htmlFor="username" className="w-full flex-1 mx-2 text-xs font-semibold 
                    text-gray-600 uppercase">Name
            <input className="w-full py-3 px-1 mt-1 
                    text-gray-800 appearance-none 
                    border-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required placeholder='이름을 입력해주세요' type='text' name='name'
              value={form.name} onChange={handleChange}/>
          </label>
          
          <label htmlFor="userscore" className="w-full flex-1 mx-2 text-xs font-semibold 
                    text-gray-600 uppercase">Score
             <input className="w-full py-3 px-1 mt-1 
                    text-gray-800 appearance-none 
                    border-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required placeholder='점수를 입력해주세요' type='text'
              value={form.score} onChange={handleChange} />
          </label>
          </div>
        <div className='text-center'>
          <button className='bg-blue-400 py-2 text-center px-10 md:px-12 md:py-3 text-white 
                    rounded text-xl md:text-base mt-4' type='submit' onClick={Push_Data()}>저장</button>
        </div>
      </form>
    </>
  );
};

export default Post;