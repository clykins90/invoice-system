'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '../types/invoice'
import { formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { TabsLayout } from './tabs-layout'

interface InvoiceSectionProps {
  section: Section;
  orderSummary: React.ReactNode;
}

export function InvoiceSection({ section, orderSummary }: InvoiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <TabsLayout orderSummary={orderSummary}>
      <Card>
        <CardHeader className="p-4 cursor-pointer flex flex-row items-center justify-between" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium">{section.name}</h3>
            <span className="text-gray-500">${formatCurrency(section.total)}</span>
          </div>
          <Button variant="ghost" size="icon">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="border-t px-0 pt-0">
            <div className="scrollable-content">
              {section.items.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-500">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${formatCurrency(item.actualAmount)}</div>
                    </div>
                  </div>
                  {item.showMore && (
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-800 p-0 h-auto text-sm"
                    >
                      Show More
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      <PaymentsSection />
      <PayeeSection />
    </TabsLayout>
  )
}

function PaymentsSection() {
  // Example payment data
  const payments = [
    {
      reference: 'INV001',
      method: 'Credit Card',
      amount: 1500,
      status: 'Completed',
      type: 'Deposit',
      payee: 'John Doe'
    },
    {
      reference: 'INV002',
      method: 'Bank Transfer',
      amount: 2000,
      status: 'Pending',
      type: 'Progress Payment',
      payee: 'Jane Smith'
    },
    {
      reference: 'INV003',
      method: 'PayPal',
      amount: 500,
      status: 'Overdue',
      type: 'Final Payment',
      payee: 'Acme Corp'
    }
  ];

  return (
    <div className="payments-section">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Reference #</th>
            <th className="py-2 px-4 border-b">Method</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Payment Type</th>
            <th className="py-2 px-4 border-b">Payee</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.reference} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{payment.reference}</td>
              <td className="py-2 px-4 border-b">{payment.method}</td>
              <td className="py-2 px-4 border-b">${formatCurrency(payment.amount)}</td>
              <td className="py-2 px-4 border-b">{payment.status}</td>
              <td className="py-2 px-4 border-b">{payment.type}</td>
              <td className="py-2 px-4 border-b">{payment.payee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PayeeSection() {
  const payees = []; // Replace with actual payee data

  return (
    <div className="payee-section">
      <h2>Payees</h2>
      <ul>
        {payees.map(payee => (
          <li key={payee.id}>
            <div className="flex justify-between items-center">
              <span>{payee.name}</span>
              <Button
                variant="primary"
                onClick={() => {/* Logic to request payment */}}
              >
                Request Payment
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

