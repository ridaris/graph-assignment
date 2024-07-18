import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import 'chart.js/auto';
import './GraphPlotter.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const GraphPlotter = () => {
    const [xValues, setXValues] = useState('');
    const [yValues, setYValues] = useState('');
    const [data, setData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const x = xValues.split(',').map(Number);
        const y = yValues.split(',').map(Number);

        if (x.length !== y.length) {
            alert('X and Y values must have the same length');
            return;
        }

        setData({
            labels: x,
            datasets: [{
                label: 'Graph',
                data: y,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        });
    };

    const handleReset = () => {
        setXValues('');
        setYValues('');
        setData(null);
    };

    return (
        <div className="container">
            <h1>Graph Plotter</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="xValues">X-axis values (comma separated):</label>
                <input 
                    type="text" 
                    id="xValues" 
                    value={xValues} 
                    onChange={(e) => setXValues(e.target.value)} 
                    required 
                />
                <label htmlFor="yValues">Y-axis values (comma separated):</label>
                <input 
                    type="text" 
                    id="yValues" 
                    value={yValues} 
                    onChange={(e) => setYValues(e.target.value)} 
                    required 
                />
                <button type="submit">Plot Graph</button>
                <button type="button" onClick={handleReset}>Reset Graph</button>
            </form>
            {data && <Line data={data} />}
        </div>
    );
};

export default GraphPlotter;