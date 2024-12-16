'use client'

import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

export function SendInvoice() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Send Invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Invoice</DialogTitle>
          <DialogDescription>
            Choose how you would like to send this invoice
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="link">Payment Link</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter email subject" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Input id="message" placeholder="Enter optional message" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sms">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Input id="message" placeholder="Enter optional message" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="link">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="link">Payment Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="link"
                    readOnly
                    value="https://pay.example.com/inv/123456"
                  />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

