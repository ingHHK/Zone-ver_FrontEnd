import React, { useEffect } from 'react';


const Scoresend = () => {


  const { kakao } = window;


  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.57481652935465, 126.97909517414111),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {

      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

        var circle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(lat, lon),  // 원의 중심좌표 입니다 
          radius: 150, // 미터 단위의 원의 반지름입니다 
          strokeWeight: 2, // 선의 두께입니다 
          strokeColor: '#75B8FA', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'dashed', // 선의 스타일 입니다
          fillColor: '#CFE7FF', // 채우기 색깔입니다
          fillOpacity: 0.5  // 채우기 불투명도 입니다  
        });

        // 지도에 원을 표시합니다 
        circle.setMap(map);


      });

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(37.57481652935465, 126.97909517414111),
        message = 'geolocation을 사용할수 없어요..'

      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
      });

      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

  }, []);



  return (
    <>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/2 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto w-full mt-10 md:mt-0 relative z-10 border border-gray-200 shadow-md">
          <h1 className="text-indigo-600 text-2xl mb-1 font-medium title-font text-center">
            Score Send
          </h1>

          <div id='myMap' style={{
            width: '500px',
            height: '500px', display: 'block', marginRight: 'auto', marginLeft: 'auto',
          }}></div>

          <button className="text-white bg-indigo-500 border-0 w-5/12 mt-5 mr-auto ml-auto py-2 px-20 focus:outline-none hover:bg-indigo-600 rounded text-base" >
            내 위치 확인하기
          </button>

          <button className="text-white bg-indigo-500 border-0 w-5/12 mt-5 mr-auto ml-auto py-2 px-20 focus:outline-none hover:bg-indigo-600 rounded text-base animate-bounce ">
            내 위치 지정하기
          </button>

        </div>
      </div>
    </>
  )
};

export default Scoresend;