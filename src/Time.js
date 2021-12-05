import React, { Component } from 'react';
import './styles.scss';
// 'ssokor400', 'Nanum Gothic','Malgun Gothic','돋움','dotum','AppleGothic', Helvetica, Arial, Sans-Serif;

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date('Dec 25, 2021 00:00:00').getTime(),
  x = setInterval(function () {

    let now = new Date().getTime(),
      distance = countDown - now;

    document.getElementById('days').innerText = Math.floor(distance / (day))
    document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour))
    document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute))
    document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second)
  }, second)

class Timer extends Component {
  render() {
    return (
      <>
        <div className='timer-container'>
          <div id='timer-content'>
            <section>
              <ul id='timer-countdown'>
                <li><span className='timer-number' id='days'></span>
                  <p className='timer-word'>Days</p>
                </li>
                <li><span className='timer-number' id='hours'></span>
                  <p className='timer-word'>Hours</p>
                </li>
                <li><span className='timer-number' id='minutes'></span>
                  <p className='timer-word'>Minutes</p>
                </li>
                <li><span className='timer-number' id='seconds'></span>
                  <p className='timer-word'>Seconds</p>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default Timer;