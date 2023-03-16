import React from 'react';

export const Facial = () => {
  const items = [
    {
      id: 1,
      src: 'normal',
      title: 'Normal',
      slide: 20,
    },
    {
      id: 2,
      src: 'vivid',
      title: 'Vivid',
      slide: 40,
    },
    {
      id: 3,
      src: 'intense',
      title: 'Intense',
      slide: 60,
    },
    {
      id: 4,
      src: 'vividcool',
      title: 'Vivid Cool',
      slide: 80,
    },
    {
      id: 5,
      src: 'vividwarm',
      title: 'Vivid Warm',
      slide: 100,
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
  const [cool, setCool] = React.useState(58);
  return (
    <>
      <div className="slider-field">
        <div className="slider-info">{cool}</div>
        <Slider
          axis="x"
          x={cool}
          xmax={100}
          xmin={0}
          onChange={({ x }) => setCool(x)}
        />
      </div>
      <div className="items">
        {items.map(item, index => (
          <Effect key={index} effectInfo={item} setSlide={setCool} />
        ))}
      </div>
      <img src={IMG.RIGHT_ARROW} className="right-arrow" alt="right arrow" />
    </>
  );
};
