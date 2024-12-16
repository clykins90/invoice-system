'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface CostItem {
  id: string;
  name: string;
  planned: number;
  actual: number;
}

interface Section {
  id: string;
  name: string;
  items: CostItem[];
}

export function CostTracker() {
  const [sections, setSections] = useState<Section[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPlanned, setNewItemPlanned] = useState('');
  const [newSectionName, setNewSectionName] = useState('');

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const addSection = () => {
    if (!newSectionName) return;
    
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSectionName,
      items: [],
    };

    setSections([...sections, newSection]);
    setNewSectionName('');
  };

  const addLineItem = (sectionId: string) => {
    if (!newItemName || !newItemPlanned) return;
    
    const newItem: CostItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newItemName,
      planned: parseFloat(newItemPlanned),
      actual: 0,
    };

    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, items: [...section.items, newItem] }
        : section
    ));
    
    setNewItemName('');
    setNewItemPlanned('');
  };

  const updatePlannedCost = (sectionId: string, itemId: string, planned: string) => {
    setSections(sections.map(section => 
      section.id === sectionId
        ? {
            ...section,
            items: section.items.map(item =>
              item.id === itemId ? { ...item, planned: parseFloat(planned) || 0 } : item
            )
          }
        : section
    ));
  };

  const updateActualCost = (sectionId: string, itemId: string, actual: string) => {
    setSections(sections.map(section => 
      section.id === sectionId
        ? {
            ...section,
            items: section.items.map(item =>
              item.id === itemId ? { ...item, actual: parseFloat(actual) || 0 } : item
            )
          }
        : section
    ));
  };

  const calculateSectionTotals = (items: CostItem[]) => {
    return items.reduce((acc, item) => ({
      planned: acc.planned + item.planned,
      actual: acc.actual + item.actual,
    }), { planned: 0, actual: 0 });
  };

  const calculateGrandTotal = () => {
    return sections.reduce((acc, section) => {
      const sectionTotal = calculateSectionTotals(section.items);
      return {
        planned: acc.planned + sectionTotal.planned,
        actual: acc.actual + sectionTotal.actual,
      };
    }, { planned: 0, actual: 0 });
  };

  const grandTotal = calculateGrandTotal();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Cost</h2>
          
          <div className="space-y-8">
            {sections.map((section) => {
              const sectionTotals = calculateSectionTotals(section.items);
              return (
                <div key={section.id} className="space-y-4">
                  <h3 className="font-medium text-gray-900">{section.name}</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2 w-[40%]">Line Item</th>
                        <th className="text-right pb-2 w-[20%]">Planned</th>
                        <th className="text-right pb-2 w-[20%]">Actual</th>
                        <th className="text-right pb-2 w-[20%]">Variance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-4">{item.name}</td>
                          <td className="py-4">
                            <div className="flex justify-end">
                              <Input
                                type="number"
                                value={item.planned || ''}
                                onChange={(e) => updatePlannedCost(section.id, item.id, e.target.value)}
                                className="w-32 text-right"
                              />
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex justify-end">
                              <Input
                                type="number"
                                value={item.actual || ''}
                                onChange={(e) => updateActualCost(section.id, item.id, e.target.value)}
                                className="w-32 text-right"
                              />
                            </div>
                          </td>
                          <td className="text-right py-4">
                            {formatCurrency(item.actual - item.planned)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold">
                        <td className="pt-4">Section Total</td>
                        <td className="text-right pt-4">{formatCurrency(sectionTotals.planned)}</td>
                        <td className="text-right pt-4">{formatCurrency(sectionTotals.actual)}</td>
                        <td className="text-right pt-4">
                          {formatCurrency(sectionTotals.actual - sectionTotals.planned)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="flex gap-4">
                    <Input
                      placeholder="Line item name"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Planned cost"
                      value={newItemPlanned}
                      onChange={(e) => setNewItemPlanned(e.target.value)}
                      className="w-48"
                    />
                    <Button 
                      onClick={() => addLineItem(section.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                      Add Line Item
                    </Button>
                  </div>
                </div>
              );
            })}

            {sections.length > 0 && (
              <div className="border-t pt-4">
                <table className="w-full">
                  <tfoot>
                    <tr className="font-bold text-lg">
                      <td>Grand Total</td>
                      <td className="text-right">{formatCurrency(grandTotal.planned)}</td>
                      <td className="text-right">{formatCurrency(grandTotal.actual)}</td>
                      <td className="text-right">
                        {formatCurrency(grandTotal.actual - grandTotal.planned)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Input
                placeholder="New section name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={addSection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Add Section
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 