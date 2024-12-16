'use client'

import { useState } from 'react'
import { Payee } from '../types/invoice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface SplitPaymentProps {
  payees: Payee[]
  onAddPayee: (payee: Omit<Payee, 'id'>) => void
}

export function SplitPayment({ payees, onAddPayee }: SplitPaymentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newPayee, setNewPayee] = useState<Omit<Payee, 'id'>>({
    name: '',
    email: '',
    percentage: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddPayee(newPayee)
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Split Payments</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Payee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payee</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newPayee.name}
                  onChange={(e) => setNewPayee({ ...newPayee, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPayee.email}
                  onChange={(e) => setNewPayee({ ...newPayee, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Percentage</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={newPayee.percentage}
                  onChange={(e) =>
                    setNewPayee({ ...newPayee, percentage: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>
              <Button type="submit">Add Payee</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {payees.map((payee) => (
          <div
            key={payee.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <div>
              <div className="font-medium">{payee.name}</div>
              <div className="text-sm text-gray-500">{payee.email}</div>
            </div>
            <div className="font-medium">{payee.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

