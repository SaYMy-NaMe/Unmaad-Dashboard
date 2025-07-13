import React from 'react';
import { Bot, Zap, MessageCircle } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'satirical-bot',
      label: 'Satirical Bot',
      icon: Bot
    },
    {
      id: 'satirical-bot-1',
      label: 'Satirical Bot 1',
      icon: MessageCircle
    },
    {
      id: 'lambda',
      label: 'Lambda',
      icon: Zap
    }
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <IconComponent size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation; 