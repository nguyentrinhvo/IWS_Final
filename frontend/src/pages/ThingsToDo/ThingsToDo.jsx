import React, { useState, useEffect } from 'react';
import ThingsHeader from './ThingsHeader';
import ThingsCategory from './ThingsCategory';
import Attractions from './Attractions';
import Experiences from './Experiences';
import Essentials from './Essentials';
import AllActivities from './AllActivities';
import { getCategories } from '../../services/categoryService';
import { attractionService } from '../../services/attractionService';
import { useGlobal } from '../../context/GlobalContext';

const ThingsToDo = () => {
  const { t } = useGlobal();
  const [categories, setCategories] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('explore');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, attrRes] = await Promise.all([
          getCategories().catch(() => []),
          attractionService.searchAttractions({ size: 20 }).catch(() => ({ content: [] }))
        ]);
        setCategories(Array.isArray(catRes) ? catRes : catRes?.content || []);
        setAttractions(attrRes?.content || []);
      } catch (err) {
        console.error('Failed to load ThingsToDo data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Split attractions into sub-sections by type for display
  const attractionItems = attractions.filter(a => a.attractionType === 'attraction' || a.attractionType === 'nature' || a.attractionType === 'culture');
  const experienceItems = attractions.filter(a => a.attractionType === 'entertainment' || a.attractionType === 'sport');
  const essentialItems = attractions.filter(a => a.attractionType === 'essential' || a.attractionType === 'service');

  return (
    <div className="bg-white min-h-screen">
      <ThingsHeader />
      <ThingsCategory 
        categories={categories} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-12 h-12 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-gray-50/50 pb-20">
          {(activeCategory === 'explore' || activeCategory === 'all-activities') && (
            <section className="pt-12 pb-6 w-full max-w-[1200px] mx-auto px-4 md:px-6">
              <div className="flex flex-col mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{t('ttd_all_activities_title')}</h2>
                <p className="text-gray-500 mt-2 text-lg">{t('ttd_all_activities_desc')}</p>
              </div>
              <AllActivities data={attractions} />
            </section>
          )}

          {(activeCategory === 'explore' || activeCategory === 'attractions') && attractionItems.length > 0 && <Attractions data={attractionItems} />}
          {(activeCategory === 'explore' || activeCategory === 'experiences') && experienceItems.length > 0 && <Experiences data={experienceItems} />}
          {(activeCategory === 'explore' || activeCategory === 'essentials') && essentialItems.length > 0 && <Essentials data={essentialItems} />}
        </div>
      )}
    </div>
  );
};

export default ThingsToDo;
