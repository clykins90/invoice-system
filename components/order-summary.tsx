'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { PaymentSchedule } from './payment-schedule'
import { SplitPayment } from './split-payment'
import { Payment, Payee } from '../types/invoice'
import { SendInvoice } from './send-invoice'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

interface OrderSummaryProps {
  company: {
    name: string
    logo: string
    details: string[]
  }
  summary: {
    subtotal: number
    tax: number
    total: number
  }
  payments: Payment[]
  payees: Payee[]
  onAddPayment: (payment: Omit<Payment, 'id'>) => void
  onAddPayee: (payee: Omit<Payee, 'id'>) => void
}

export function OrderSummary({
  company,
  summary,
  payments,
  payees,
  onAddPayment,
  onAddPayee,
}: OrderSummaryProps) {
  // Calculate total paid amount from payments
  const totalPaid = payments.reduce((sum, payment) => 
    payment.status === 'paid' ? sum + payment.amount : sum, 0
  );
  
  // Calculate balance due
  const balanceDue = summary.total - totalPaid;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/chameleon-icon.png"
            alt="Chameleon"
            width={24}
            height={24}
          />
          <h2 className="text-xl font-semibold">{company.name}</h2>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          {company.details.map((detail, i) => (
            <p key={i}>{detail}</p>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Invoice Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Job Value</span>
              <span>${formatCurrency(summary.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Balance Paid</span>
              <span className="text-green-600">${formatCurrency(totalPaid)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-medium">
              <span>Balance Due</span>
              <span className="text-blue-600">${formatCurrency(balanceDue)}</span>
            </div>
          </div>
        </div>
        <PaymentSchedule payments={payments} onAddPayment={onAddPayment} />
        <SplitPayment payees={payees} onAddPayee={onAddPayee} />
        <div className="flex flex-col gap-2">
          <SendInvoice />
          <Button variant="outline">Request Payment</Button>
        </div>
      </CardContent>
    </Card>
  )
}

