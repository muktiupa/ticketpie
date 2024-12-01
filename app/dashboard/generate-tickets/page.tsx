'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import BookingForm from '../../../components/booking-form'

interface TicketData {
  // This will store the extracted ticket data
  bookingDetails?: {
    reference: string;
    date: string;
    pnr: string;
  };
  flightDetails?: {
    airline: string;
    flightNumber: string;
    departure: {
      airport: string;
      city: string;
      code: string;
      datetime: string;
    };
    arrival: {
      airport: string;
      city: string;
      code: string;
      datetime: string;
    };
    duration: string;
  };
  passengerDetails?: Array<{
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    type: string;
    seat?: string;
    meal?: string;
    handBaggage?: string;
    checkInBaggage?: string;
  }>;
  paymentDetails?: {
    baseFare: number;
    taxes: number;
    convenienceFees: number;
    promoDiscount: number;
    totalAmount: number;
  };
}

export default function GenerateTickets() {
  const [isUploading, setIsUploading] = useState(false)
  const [ticketData, setTicketData] = useState<TicketData | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('pdf', file)

      const response = await fetch('/api/pdf/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to upload PDF')

      const data = await response.json()
      setTicketData(data.data.ticketData)
    } catch (error) {
      console.error('Error uploading PDF:', error)
      alert('Failed to upload and process PDF. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12">
              <Upload className="h-8 w-8 mb-4 text-gray-500" />
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-semibold">Upload Ticket PDF</h3>
                <p className="text-sm text-gray-500">
                  Upload your ticket PDF to automatically extract ticket details
                </p>
              </div>
              <div className="mt-4">
                <Label htmlFor="pdf-upload" className="sr-only">
                  Choose file
                </Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('pdf-upload')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Select PDF'}
                </Button>
              </div>
            </div>
            {ticketData && <BookingForm initialData={ticketData} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

