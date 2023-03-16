import React from 'react'
import { useHistory } from 'react-router-dom';
import Button from '../../Common/Button/Button';

const NoPerformance = () => {
  const history = useHistory();
  return (
     <>
        <div className="no-performance">
           <h4>No performances yet</h4>
           <p>
              Want to share your talents and/or products that you love <br/>
              with the world? Plan your first performance now!
           </p>
           <Button
              onClick={() => history.push('/performancescheduler?type=sale')}
            >
              <span>+</span> NEW PERFORMANCE
            </Button>
        </div>
     </>
  )
}

export default NoPerformance;