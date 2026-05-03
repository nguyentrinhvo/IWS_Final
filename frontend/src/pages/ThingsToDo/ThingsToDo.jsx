import React from 'react';
import ThingsHeader from './ThingsHeader';
import ThingsCategory from './ThingsCategory';
import Attractions from './Attractions';
import Experiences from './Experiences';
import Essentials from './Essentials';
import AllActivities from './AllActivities';

import {
  categories,
  attractions,
  experiences,
  essentials,
  allActivities,
  reviews
} from '../../data/mockData';

const ThingsToDo = () => {
  return (
    <div className="things-to-do">
      <ThingsHeader />

      <ThingsCategory categories={categories} />

      <section className="explore-section">
        <h2>Explore All Activities</h2>
        <AllActivities data={allActivities} />
      </section>

      <Attractions data={attractions} />
      <Experiences data={experiences} />
      <Essentials data={essentials} />
    </div>
  );
};

export default ThingsToDo;