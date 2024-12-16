'use client'

import { useState, useRef } from 'react'
import { Payment, PaymentType } from '../types/invoice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { formatCurrency } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'

interface PaymentScheduleProps {
  payments: Payment[]
  onAddPayment: (payment: Omit<Payment, 'id'>) => void
}

export function PaymentSchedule({ payments, onAddPayment }: PaymentScheduleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newPayment, setNewPayment] = useState<Omit<Payment, 'id'>>({
    paymentType: 'deposit',
    amount: 0,
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddPayment(newPayment)
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Payment Schedule</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Payment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <RadioGroup
                  value={newPayment.paymentType}
                  onValueChange={(value: PaymentType) =>
                    setNewPayment({ ...newPayment, paymentType: value })
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deposit" id="deposit" />
                    <Label htmlFor="deposit">Deposit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="progress" id="progress" />
                    <Label htmlFor="progress">Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="final" id="final" />
                    <Label htmlFor="final">Final</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="plan" id="plan" />
                    <Label htmlFor="plan">Plan</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newPayment.dueDate}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, dueDate: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit">Add Payment</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <div>
              <div className="font-medium capitalize">{payment.paymentType} Payment</div>
              <div className="text-sm text-gray-500">Due: {payment.dueDate}</div>
            </div>
            <div>
              <div className="font-medium">${formatCurrency(payment.amount)}</div>
              <div className={payment.status === 'paid' ? 'text-green-600' : 'text-orange-600'}>
                {payment.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

