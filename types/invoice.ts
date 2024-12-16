export type PaymentType = 'deposit' | 'progress' | 'final' | 'plan'
export type PaymentStatus = 'pending' | 'paid'

export interface Payment {
  id: string
  paymentType: PaymentType
  amount: number
  status: PaymentStatus
  dueDate: string
  paidDate?: string
}

export interface LineItem {
  id: string
  name: string
  description?: string
  estimatedAmount: number
  actualAmount: number
  showMore?: boolean
}

export interface Section {
  id: string
  name: string
  items: LineItem[]
  total: number
  isExpanded?: boolean
}

export interface Payee {
  id: string
  name: string
  email: string
  percentage: number
}

export interface Invoice {
  id: string
  sections: Section[]
  payments: Payment[]
  payees: Payee[]
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
}

