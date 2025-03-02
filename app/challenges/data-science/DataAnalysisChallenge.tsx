'use client';
// app/challenges/data-science/DataAnalysisChallenge.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface DataPoint {
  month: string;
  sales: number;
  customers: number;
}

const DataAnalysisChallenge: React.FC = () => {
  const [solution, setSolution] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock dataset for the challenge
  const dataset: DataPoint[] = [
    { month: 'Jan', sales: 12000, customers: 156 },
    { month: 'Feb', sales: 18000, customers: 192 },
    { month: 'Mar', sales: 25000, customers: 231 },
    { month: 'Apr', sales: 17000, customers: 175 },
    { month: 'May', sales: 21000, customers: 189 },
    { month: 'Jun', sales: 30000, customers: 276 },
    { month: 'Jul', sales: 38000, customers: 310 },
    { month: 'Aug', sales: 36000, customers: 301 },
    { month: 'Sep', sales: 28000, customers: 265 },
    { month: 'Oct', sales: 22000, customers: 212 },
    { month: 'Nov', sales: 27000, customers: 234 },
    { month: 'Dec', sales: 34000, customers: 287 }
  ];

  useEffect(() => {
    // Start the timer when the component mounts
    setStartTime(Date.now());
    
    // Cleanup function to calculate time spent when component unmounts
    return () => {
      const endTime = Date.now();
      const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
      setTimeSpent(timeSpentInSeconds);
    };
  }, []);

  const handleShowHint = () => {
    setUsedHint(true);
    setShowHint(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    
    const endTime = Date.now();
    const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
    
    try {
      // Call your API endpoint to submit the solution
      const response = await fetch('/api/submit-data-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution,
          usedHint,
          timeSpent: timeSpentInSeconds,
          track: 'Data Science',
          challengeId: 'data-analysis-1',
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit solution');
      }
      
      setSuccess(true);
    } catch (err) {
      setError('Error submitting solution. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate some basic statistics for display
  const totalSales = dataset.reduce((sum, point) => sum + point.sales, 0);
  const totalCustomers = dataset.reduce((sum, point) => sum + point.customers, 0);
  const avgSalesPerCustomer = (totalSales / totalCustomers).toFixed(2);

  return (
    <div>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Data Interpretation</h2>
        
        <p className="mb-4">
          You've been provided with monthly sales and customer data for an e-commerce business. 
          Analyze the data and provide insights on the following:
        </p>
        
        <ul className="list-disc pl-6 mb-6">
          <li>Identify months with the highest and lowest sales</li>
          <li>Calculate the average monthly sales</li>
          <li>Determine if there's a correlation between number of customers and sales</li>
          <li>Recommend which months would be best for marketing campaigns based on historical data</li>
          <li>Identify any seasonal trends in the data</li>
        </ul>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Sales ($)</th>
                <th className="py-2 px-4 border-b">Customers</th>
              </tr>
            </thead>
            <tbody>
              {dataset.map((point, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-2 px-4 border-b">{point.month}</td>
                  <td className="py-2 px-4 border-b text-right">${point.sales.toLocaleString()}</td>
                  <td className="py-2 px-4 border-b text-right">{point.customers}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-semibold">
                <td className="py-2 px-4 border-b">Total</td>
                <td className="py-2 px-4 border-b text-right">${totalSales.toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-right">{totalCustomers}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mb-6">
          <p className="font-semibold">Summary Statistics:</p>
          <p>Average Sales per Customer: ${avgSalesPerCustomer}</p>
          
          {/* Data Visualization */}
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataset}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Sales ($)" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="customers" name="Customers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {showHint && (
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="font-semibold">Hint:</p>
            <p>
              Look for patterns in the summer months (Jun-Aug) versus winter months (Nov-Jan).
              Consider calculating the coefficient of correlation between sales and customers.
              When analyzing for marketing campaigns, consider both absolute sales and growth rates.
            </p>
          </div>
        )}
        
        {!showHint && (
          <Button 
            onClick={handleShowHint}
            variant="outline"
            className="mb-6"
          >
            Need a Hint?
          </Button>
        )}
        
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Your Analysis and Recommendations:
          </label>
          <Textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Enter your detailed analysis here..."
            rows={10}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={submitting || solution.trim().length < 50}
          className="w-full"
        >
          {submitting ? 'Submitting...' : 'Submit Analysis'}
        </Button>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>
              Your analysis has been submitted successfully! You can now continue to the next challenge.
            </AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default DataAnalysisChallenge;