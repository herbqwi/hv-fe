import './dashboard.css'

import SlidingList from '../../../../components/management/dashboard/sliding-list/sliding-list.component';
import SectionsNav from '../../../../components/management/dashboard/sections-nav/sections-nav.componnet';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DaySalesChart from '../../../../components/management/dashboard/charts/day-sales-chart/day-sales-chart.component';
import ChartContainer from '../../../../components/management/dashboard/charts/chart-container.component';
import PieChart from '../../../../components/management/dashboard/charts/best-selling-machines/best-selling-machines.component';
import BestSellingFood from '../../../../components/management/dashboard/charts/best-selling-food/best-selling-food.component';
import ShowTimer from '../../../../components/base/show-timer/show-timer.component';
import InfoCard from '../../../../components/management/dashboard/info-card/info-card.component';

const DashboardSection = () => {
  const data1 = [
    { day: 'Mon', count: 0 },
    { day: 'Tue', count: 0 },
    { day: 'Wed', count: 0 },
    { day: 'Fri', count: 0 },
  ];

  const data2 = [
    { day: 'Jan', count: 0 },
    { day: 'Feb', count: 0 },
    { day: 'Mar', count: 0 },
    { day: 'Apr', count: 0 },
  ];

  return <div className="contents">
    <ShowTimer timeout={0}>
      <div className='header'>
        <div className='callout'>
          <p>Good Evening,</p>
          <p>Omar Herbawi</p>
        </div>
      </div>
    </ShowTimer>
    <ShowTimer timeout={50}>
      <div className="info-cards-container">
        <InfoCard backgroundColor="rgba(228, 174, 130, 0.2)" title="Total Votes" info="0"></InfoCard>
        <InfoCard backgroundColor="#fad85d2e" title="Average Votes" info="0"></InfoCard>
        <InfoCard backgroundColor="#f2a0ff2e" title="Total Elections" info="-"></InfoCard>
        <InfoCard backgroundColor="#0bf4c82e" mini={true} title="Ct. Elections" info="2"></InfoCard>
      </div>
    </ShowTimer>
    <ShowTimer timeout={100}>
      <SlidingList icon={faWarning} title="Warnings"></SlidingList>
    </ShowTimer>
    <div className='charts-container'>
      <ShowTimer timeout={150}><ChartContainer title="Daily Votes"><DaySalesChart data={data1} daily={true} /></ChartContainer></ShowTimer>
      <ShowTimer timeout={200}><ChartContainer title="Monthly Votes"><DaySalesChart data={data2} daily={false} /></ChartContainer></ShowTimer>
      {/* <ShowTimer timeout={250}><ChartContainer><PieChart
        data={[
          { label: "Machine A", value: 30 },
          { label: "Machine B", value: 20 },
          { label: "Machine C", value: 10 },
          { label: "Machine D", value: 15 },
          { label: "Machine E", value: 5 },
          { label: "Machine F", value: 20 },
        ]}
      /></ChartContainer></ShowTimer> */}
      {/* <ShowTimer timeout={300}><ChartContainer><BestSellingFood></BestSellingFood></ChartContainer></ShowTimer> */}
    </div>
  </div>
}

export default DashboardSection;