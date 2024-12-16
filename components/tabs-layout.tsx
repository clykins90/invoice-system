import { useState } from 'react';
import { CostTracker } from './cost-tracker';

interface TabsLayoutProps {
  children: React.ReactNode;
  orderSummary?: React.ReactNode;
}

interface JobValue {
  contractValue: number;
  amountCollected: number;
  balanceDue: number;
  expectedProfitMargin: number;
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({ children, orderSummary }) => {
  const [activeTab, setActiveTab] = useState<'costs' | 'revenue'>('revenue');
  const [jobValue, setJobValue] = useState<JobValue>({
    contractValue: 0,
    amountCollected: 0,
    balanceDue: 0,
    expectedProfitMargin: 0,
  });

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="space-y-6">
        {/* Job Value Module */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Job Value</h2>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Contract Value</div>
                <div className="text-xl font-semibold">{formatCurrency(jobValue.contractValue)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Amount Collected</div>
                <div className="text-xl font-semibold">{formatCurrency(jobValue.amountCollected)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Balance Due</div>
                <div className="text-xl font-semibold">{formatCurrency(jobValue.balanceDue)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Expected Profit Margin</div>
                <div className="text-xl font-semibold">{formatPercentage(jobValue.expectedProfitMargin)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {['costs', 'revenue'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'costs' | 'revenue')}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'costs' ? (
            <CostTracker />
          ) : (
            <div className="space-y-6">
              {/* Invoice */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex-1 overflow-y-auto overscroll-contain scrollable-content" 
                       style={{
                         height: '100vh',
                         willChange: 'transform',
                         position: 'relative'
                       }}>
                    {children}
                  </div>
                </div>
              </div>

              {/* Invoice Summary */}
              {orderSummary && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    {orderSummary}
                  </div>
                </div>
              )}

              {/* Payments Section - This would be another component */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Payments</h2>
                  {/* Payments content would go here */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 