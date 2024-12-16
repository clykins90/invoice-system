'use client'

import { InvoiceSection } from '../components/invoice-section'
import { OrderSummary } from '../components/order-summary'
import { Button } from '../components/ui/button'
import { Invoice, Payment, Payee } from '../types/invoice'
import { useState } from 'react';

// Mock data for demonstration
const mockInvoice: Invoice = {
  id: '2936',
  sections: [
    {
      id: '1',
      name: 'Roof',
      total: 15000.00,
      items: [
        {
          id: '1',
          name: 'Tear Off Roof',
          description: 'Complete removal of existing roofing materials',
          actualAmount: 5000.00,
          estimatedAmount: 4800.00,
          showMore: false,
        },
        {
          id: '2',
          name: 'Install Roof',
          description: 'Installation of new roofing system',
          actualAmount: 8500.00,
          estimatedAmount: 8000.00,
          showMore: false,
        },
        {
          id: '3',
          name: 'Warranty',
          description: 'Manufacturer and workmanship warranty',
          actualAmount: 1500.00,
          estimatedAmount: 1500.00,
          showMore: false,
        },
      ],
    },
  ],
  company: {
    name: 'Chameleon Roofing',
    logo: '/logo.png',
    details: [
      'Augusta Credit Union',
      'Bountiful, Utah 84010',
    ],
  },
  summary: {
    subtotal: 15000.00,
    tax: 975.00,
    total: 15975.00,
  },
  payments: [
    {
      id: '1',
      paymentType: 'deposit',
      amount: 4000.00,
      status: 'paid',
      dueDate: '2023-06-01',
      paidDate: '2023-06-01',
    },
    {
      id: '2',
      paymentType: 'progress',
      amount: 8000.00,
      status: 'pending',
      dueDate: '2023-07-01',
    },
    {
      id: '3',
      paymentType: 'final',
      amount: 3975.00,
      status: 'pending',
      dueDate: '2023-08-01',
    },
  ],
  payees: [
    {
      id: '1',
      name: 'John Contractor',
      email: 'john@example.com',
      percentage: 70,
    },
    {
      id: '2',
      name: 'Mike Supplier',
      email: 'mike@example.com',
      percentage: 30,
    },
  ],
}

export default function InvoicePage() {
  const [invoice, setInvoice] = useState<Invoice>(mockInvoice)

  const handleAddPayment = (newPayment: Omit<Payment, 'id'>) => {
    setInvoice((prev) => ({
      ...prev,
      payments: [...prev.payments, { ...newPayment, id: Date.now().toString() }],
    }))
  }

  const handleAddPayee = (newPayee: Omit<Payee, 'id'>) => {
    setInvoice((prev) => ({
      ...prev,
      payees: [...prev.payees, { ...newPayee, id: Date.now().toString() }],
    }))
  }

  const orderSummary = (
    <OrderSummary
      company={invoice.company}
      summary={invoice.summary}
      payments={invoice.payments}
      payees={invoice.payees}
      onAddPayment={handleAddPayment}
      onAddPayee={handleAddPayee}
    />
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Profit Tracker</h1>
          <p className="text-sm text-gray-500">123 Main Dr</p>
        </div>
        <Button variant="link" className="text-blue-600">
          Expand All
        </Button>
      </div>
      
      <div>
        {invoice.sections.map((section) => (
          <InvoiceSection
            key={section.id}
            section={section}
            orderSummary={orderSummary}
          />
        ))}
      </div>
    </div>
  )
}

