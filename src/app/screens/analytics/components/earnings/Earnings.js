import React from 'react';
import Tabs from './Tabs';
// import Livestreams from './LiveStreams';
// import Products from './Products';
import './Earnings.scss';

const Earnings = () => {
  const tabsData = ['Livestreams', 'Products'];

  // const streamsData = ['a', 'b', 'c'];
  // const productsData = ['c', 'b', 'a'];
  // const tabsComponents = useMemo(
  //   () => [
  //     <Livestreams streamsData={streamsData} />,
  //     <Products productsData={productsData} />,
  //   ],
  //   [streamsData, productsData],
  // );

  return (
    <div className="earnings_data">
      <div className="earnings__title h1">Earnings</div>
      <div className="earnings__body">
        <Tabs tabs={tabsData} />
        {/* {tabsComponents} */}
        <div>
          <div className="earnings__body-soon soon">Coming soon</div>
          <table>
            <thead>
              <tr>
                <td className="earnings__table-head">Name</td>
                <td className="earnings__table-head">Date / time</td>
                <td className="earnings__table-head">ticket sales</td>
                <td className="earnings__table-head">Product Sales</td>
                <td className="earnings__table-head">gifts</td>
                <td className="earnings__table-head">all earnings</td>
              </tr>
            </thead>
            <tbody>
              <tr className="earnings__table-row">
                <td className="earnings__table-data">
                  Live DJ Set to start off 2021!!!
                </td>
                <td className="earnings__table-data">Oct 5, 2020, 8-9PM</td>
                <td className="earnings__table-data">$117</td>
                <td className="earnings__table-data">-</td>
                <td className="earnings__table-data">$25</td>
                <td className="earnings__table-data">$259</td>
                <td className="earnings__table-data table-data__detail">
                  Details
                </td>
              </tr>
              <tr className="earnings__table-row">
                <td className="earnings__table-data">
                  Live DJ Set to start off 2021!!!
                </td>
                <td className="earnings__table-data">Oct 5, 2020, 8-9PM</td>
                <td className="earnings__table-data">$117</td>
                <td className="earnings__table-data">-</td>
                <td className="earnings__table-data">-</td>
                <td className="earnings__table-data">$259</td>
                <td className="earnings__table-data table-data__detail">
                  Details
                </td>
              </tr>
              <tr className="earnings__table-row">
                <td className="earnings__table-data">
                  Live DJ Set to start off 2021!!!
                </td>
                <td className="earnings__table-data">Oct 5, 2020, 8-9PM</td>
                <td className="earnings__table-data">$117</td>
                <td className="earnings__table-data">-</td>
                <td className="earnings__table-data">-</td>
                <td className="earnings__table-data">$259</td>
                <td className="earnings__table-data table-data__detail">
                  Details
                </td>
              </tr>
              <tr className="earnings__table-row">
                <td className="earnings__table-data">
                  Live DJ Set to start off 2021!!!
                </td>
                <td className="earnings__table-data">Oct 5, 2020, 8-9PM</td>
                <td className="earnings__table-data">$117</td>
                <td className="earnings__table-data">$214</td>
                <td className="earnings__table-data">$25</td>
                <td className="earnings__table-data">$259</td>
                <td className="earnings__table-data table-data__detail">
                  Details
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
