import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { navData, nifty50Data, fundInfo } from '../data/navData';
import { calculateReturns, calculateDrawdown } from '../utils/calculations';
import '../styles/Portfolio.css';

function Portfolio() {
  const [fromDate, setFromDate] = useState('2019-01-01');
  const [toDate, setToDate] = useState('2024-04-24');

  // Calculate returns data
  const returnsData = useMemo(() => calculateReturns(navData), []);

  // Prepare chart data
  const chartData = useMemo(() => {
    const filtered = navData.filter(d => d.date >= fromDate && d.date <= toDate);
    const niftyFiltered = nifty50Data.filter(d => d.date >= fromDate && d.date <= toDate);
    
    return filtered.map((item, index) => {
      const niftyItem = niftyFiltered.find(n => n.date === item.date) || 
                        niftyFiltered[Math.min(index, niftyFiltered.length - 1)];
      
      return {
        date: item.date,
        focused: item.nav,
        nifty50: niftyItem ? niftyItem.nav : null,
        drawdown: calculateDrawdown(filtered.slice(0, index + 1))
      };
    });
  }, [fromDate, toDate]);

  // Calculate current returns
  const currentNav = navData[navData.length - 1].nav;
  const startNav = navData[0].nav;
  
  const ytdReturn = ((currentNav - 658.1) / 658.1 * 100).toFixed(2);
  const oneMonthReturn = ((currentNav - navData[navData.length - 30].nav) / navData[navData.length - 30].nav * 100).toFixed(2);
  
  return (
    <div className="portfolio">
      <div className="portfolio-container">
        <header className="portfolio-header">
          <h1>Portfolios / Focused</h1>
        </header>

        <section className="returns-section">
          <h2>Trailing Returns</h2>
          <div className="returns-table-container">
            <table className="returns-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>YTD</th>
                  <th>1D</th>
                  <th>1W</th>
                  <th>1M</th>
                  <th>3M</th>
                  <th>6M</th>
                  <th>1Y</th>
                  <th>3Y</th>
                  <th>SI</th>
                  <th>DD</th>
                  <th>MAXDD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fund-name">Focused</td>
                  <td className={returnsData.ytd < 0 ? 'negative' : 'positive'}>{returnsData.ytd}%</td>
                  <td className={returnsData.oneDay < 0 ? 'negative' : 'positive'}>{returnsData.oneDay}%</td>
                  <td className={returnsData.oneWeek < 0 ? 'negative' : 'positive'}>{returnsData.oneWeek}%</td>
                  <td className={returnsData.oneMonth < 0 ? 'negative' : 'positive'}>{returnsData.oneMonth}%</td>
                  <td className={returnsData.threeMonth < 0 ? 'negative' : 'positive'}>{returnsData.threeMonth}%</td>
                  <td className={returnsData.sixMonth < 0 ? 'negative' : 'positive'}>{returnsData.sixMonth}%</td>
                  <td className={returnsData.oneYear < 0 ? 'negative' : 'positive'}>{returnsData.oneYear}%</td>
                  <td className={returnsData.threeYear < 0 ? 'negative' : 'positive'}>{returnsData.threeYear}%</td>
                  <td className={returnsData.sinceInception < 0 ? 'negative' : 'positive'}>{returnsData.sinceInception}%</td>
                  <td className="negative">{returnsData.currentDD}%</td>
                  <td className="negative">{returnsData.maxDD}%</td>
                </tr>
                <tr>
                  <td className="fund-name">NIFTY50</td>
                  <td className="positive">3.1%</td>
                  <td className="positive">0.1%</td>
                  <td className="positive">1.1%</td>
                  <td className="positive">1.4%</td>
                  <td className="positive">4.4%</td>
                  <td className="positive">16.2%</td>
                  <td className="positive">26.2%</td>
                  <td className="positive">16.0%</td>
                  <td className="positive">14.5%</td>
                  <td className="negative">-1.5%</td>
                  <td className="negative">-38.4%</td>
                </tr>
              </tbody>
            </table>
            <p className="table-note">Note: Returns above 1 year are annualised.</p>
          </div>
        </section>

        <section className="chart-section">
          <div className="chart-header">
            <h2>Equity curve</h2>
            <div className="chart-controls">
              <div className="date-inputs">
                <div className="date-input-group">
                  <label>From date</label>
                  <input 
                    type="date" 
                    value={fromDate} 
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="date-input-group">
                  <label>To date</label>
                  <input 
                    type="date" 
                    value={toDate} 
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <button className="reset-btn">Reset</button>
            </div>
          </div>
          <p className="chart-subtitle">Live since {fundInfo.liveDate}</p>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.getFullYear().toString();
                  }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  domain={[0, 'auto']}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  domain={[-50, 0]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'drawdown') return [`${value.toFixed(2)}%`, 'Drawdown'];
                    return [value.toFixed(2), name === 'focused' ? 'Focused' : 'NIFTY50'];
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="focused" 
                  stroke="#10a37f" 
                  strokeWidth={2}
                  dot={false}
                  name="Focused"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="nifty50" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  name="NIFTY50"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#ff6b6b"
                  strokeWidth={1}
                  fill="url(#colorDrawdown)"
                  name="Drawdown"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="info-section">
          <div className="info-cards">
            <div className="info-item">
              <h3>About Focused Portfolio</h3>
              <p>
                Our Focused portfolio follows a concentrated investment strategy, investing in high-conviction 
                stocks across market caps. The portfolio aims to generate alpha through in-depth research and 
                disciplined risk management.
              </p>
            </div>
            <div className="info-item">
              <h3>Investment Philosophy</h3>
              <p>
                We follow a four-quadrant strategy focusing on quality businesses with strong fundamentals, 
                sustainable competitive advantages, and attractive valuations. Our concentrated approach allows 
                us to invest meaningfully in our best ideas.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Portfolio;

