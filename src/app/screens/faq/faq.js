import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IMG from '../../utils/images';
import './faq.scss';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { CONTENT } from './content';

const Faq = () => {
  const [bgColor, setBgColor] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setBgColor(true));
    return () => window.removeEventListener('scroll', () => setBgColor(false));
  }, []);
  return (
    <div className="faq" id="faq">
      <div className={bgColor ? 'faq-header active' : 'faq-header'}>
        <Link to="/">
          <img src={IMG.PRIVACY_LOGO} alt="logo" />
        </Link>
        <Link className="back-home" to="/">
          Back to Home
        </Link>
      </div>
      <div className="faq-content" id="faq-content">
        <span>Frequently Asked Questions</span>
        <Accordion allowZeroExpanded>
          {CONTENT.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>{item.title}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {item.content.split('<br>').map((text, idx) => (
                  <p className="text-content" key={idx}>
                    {text}
                  </p>
                ))}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="faq-bottom">
          <img src={IMG.PRIVACY_LOGO} />
          <p>Ⓒ 2021 PerformLive. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

Faq.propTypes = {};

export default Faq;
