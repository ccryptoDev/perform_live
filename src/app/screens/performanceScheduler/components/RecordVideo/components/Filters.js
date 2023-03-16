import React from 'react';
import IMG from 'app/utils/images';
import { Effect } from './Effect';

const items = [
  {
    id: 1,
    src: 'normal',
    title: 'Normal',
    slide: 10,
  },
  {
    id: 2,
    src: 'vivid',
    title: 'Vivid',
    slide: 20,
  },
  {
    id: 3,
    src: 'intense',
    title: 'Intense',
    slide: 30,
  },
  {
    id: 4,
    src: 'vividcool',
    title: 'Vivid Cool',
    slide: 40,
  },
  {
    id: 5,
    src: 'vividwarm',
    title: 'Vivid Warm',
    slide: 50,
  },
  {
    id: 6,
    src: 'intensecool',
    title: 'Intense Cool',
    slide: 60,
  },
  {
    id: 7,
    src: 'intensewarm',
    title: 'Intense Warm',
    slide: 70,
  },
  {
    id: 8,
    src: 'mono',
    title: 'Mono',
    slide: 80,
  },
  {
    id: 9,
    src: 'silvertone',
    title: 'Silvertone',
    slide: 90,
  },
  {
    id: 10,
    src: 'noir',
    title: 'Noir',
    slide: 100,
  },
];
export const Filters = () => {
  return (
    <>
      <div className="items">
        {items.map(item => (
          <Effect effectInfo={item} key={item.id} />
        ))}
      </div>
      <img src={IMG.RIGHT_ARROW} className="right-arrow" alt="right arrow" />
    </>
  );
};
