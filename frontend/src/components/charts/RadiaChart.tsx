import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import './Charts.scss'


const data = [
  {
    name: 'Admins',
    count: 100,
    fill: '#8884d8',
  },
  {
    name: 'Teachers',
    count: 2000,
    fill: '#83a6ed',
  },
  {
    name: 'Students',
    count: 30000,
    fill: '#83a6ed',
  },
 
];



const RadiaChart = () => {
  return (
    <div className='chart-card' >
     <ResponsiveContainer  width="100%" height="100%">
        <RadialBarChart  cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={15} data={data}>
          <RadialBar
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

 

export default RadiaChart