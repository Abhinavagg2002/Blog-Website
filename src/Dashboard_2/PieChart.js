import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Pie, Bar, Line} from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import "./Chart.css";
// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const PieChart = () => {

  const [data2,setData] = useState([]);
  const [pie,setPie] = useState(false);
  const [bar,setBar] = useState(false);
  const [line,setLine] = useState(false);
  const {id} = useParams();

  useEffect (() => {

    fetch(`http://localhost:4000/data/${id}`, {
      method :'GET',
      headers :{'Content-Type':'application/json'},
      credentials:'include',
    })
    .then((res)=>{
      res.json().then((cur)=>{
        setData(Object.entries(cur));
      })
    })
    .catch((err)=>{
      console.log('some error occured.')
    })
  },[id])

  return (
    <div className='row-container'>
      <div className='PieChart'>
      <Pie
          data={{
            labels: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            datasets: [
              {
                label: 'number of vehicles entered',
                data: data2.map((item)=>item[1]),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderRadius: 5,
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
      <div className='BarChart'>
      <Bar 
          data={{
            labels: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            datasets: [
              {
                label: 'number of vehicles entered',
                data: data2.map((item)=>item[1]),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderRadius: 5,
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
    </div>

  )
}

export default PieChart;