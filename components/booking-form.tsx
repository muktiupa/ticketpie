'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface BookingFormProps {
  initialData?: any // Replace with proper type from your API
}

export default function BookingForm({ initialData }: BookingFormProps) {
  const [formData, setFormData] = useState({
    bookingReference: initialData?.bookingDetails?.reference || '',
    bookingDate: initialData?.bookingDetails?.date || '',
    pnr: initialData?.bookingDetails?.pnr || '',
    contactDetails: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    passengers: [
      {
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        type: '',
        seat: '',
        meal: '',
        handBaggage: '',
        checkInBaggage: '',
      },
    ],
    flightDetails: {
      airline: initialData?.flightDetails?.airline || '',
      flightNumber: initialData?.flightDetails?.flightNumber || '',
      departureAirport: initialData?.flightDetails?.departure?.airport || '',
      departureCity: initialData?.flightDetails?.departure?.city || '',
      departureCode: initialData?.flightDetails?.departure?.code || '',
      departureDateTime: initialData?.flightDetails?.departure?.datetime || '',
      arrivalAirport: initialData?.flightDetails?.arrival?.airport || '',
      arrivalCity: initialData?.flightDetails?.arrival?.city || '',
      arrivalCode: initialData?.flightDetails?.arrival?.code || '',
      arrivalDateTime: initialData?.flightDetails?.arrival?.datetime || '',
      duration: initialData?.flightDetails?.duration || '',
    },
    paymentDetails: {
      baseFare: initialData?.paymentDetails?.baseFare || 0,
      taxes: initialData?.paymentDetails?.taxes || 0,
      convenienceFees: initialData?.paymentDetails?.convenienceFees || 0,
      promoCode: '',
      promoDiscount: initialData?.paymentDetails?.promoDiscount || 0,
      totalAmount: initialData?.paymentDetails?.totalAmount || 0,
    },
    additionalNotes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create booking')

      alert('Booking created successfully!')
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    }
  }

  const addPassenger = () => {
    setFormData(prev => ({
      ...prev,
      passengers: [
        ...prev.passengers,
        {
          title: '',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          type: '',
          seat: '',
          meal: '',
          handBaggage: '',
          checkInBaggage: '',
        },
      ],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Booking Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="bookingReference">Booking Reference</Label>
            <Input
              id="bookingReference"
              value={formData.bookingReference}
              onChange={e => setFormData(prev => ({ ...prev, bookingReference: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="bookingDate">Booking Date</Label>
            <Input
              id="bookingDate"
              type="date"
              value={formData.bookingDate}
              onChange={e => setFormData(prev => ({ ...prev, bookingDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="pnr">PNR</Label>
            <Input
              id="pnr"
              value={formData.pnr}
              onChange={e => setFormData(prev => ({ ...prev, pnr: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="contactTitle">Title</Label>
            <Select
              value={formData.contactDetails.title}
              onValueChange={value => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, title: value }
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mr">Mr</SelectItem>
                <SelectItem value="mrs">Mrs</SelectItem>
                <SelectItem value="ms">Ms</SelectItem>
                <SelectItem value="dr">Dr</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contactFirstName">First Name</Label>
            <Input
              id="contactFirstName"
              value={formData.contactDetails.firstName}
              onChange={e => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, firstName: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="contactMiddleName">Middle Name</Label>
            <Input
              id="contactMiddleName"
              value={formData.contactDetails.middleName}
              onChange={e => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, middleName: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="contactLastName">Last Name</Label>
            <Input
              id="contactLastName"
              value={formData.contactDetails.lastName}
              onChange={e => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, lastName: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactDetails.phone}
              onChange={e => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, phone: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactDetails.email}
              onChange={e => setFormData(prev => ({
                ...prev,
                contactDetails: { ...prev.contactDetails, email: e.target.value }
              }))}
            />
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Passenger Details</h3>
          <Button type="button" variant="outline" onClick={addPassenger}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Passenger
          </Button>
        </div>
        {formData.passengers.map((passenger, index) => (
          <div key={index} className="space-y-4 p-4 border border-neutral-200 rounded-lg dark:border-neutral-800">
            <h4 className="font-medium">Passenger {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Title</Label>
                <Select
                  value={passenger.title}
                  onValueChange={value => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, title: value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr</SelectItem>
                    <SelectItem value="mrs">Mrs</SelectItem>
                    <SelectItem value="ms">Ms</SelectItem>
                    <SelectItem value="dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>First Name</Label>
                <Input
                  value={passenger.firstName}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, firstName: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
              <div>
                <Label>Middle Name</Label>
                <Input
                  value={passenger.middleName}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, middleName: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={passenger.lastName}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, lastName: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <Select
                  value={passenger.gender}
                  onValueChange={value => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, gender: value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={passenger.type}
                  onValueChange={value => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, type: value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adult</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="infant">Infant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Seat</Label>
                <Input
                  placeholder="e.g. 12A"
                  value={passenger.seat}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, seat: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
              <div>
                <Label>Meal Preference</Label>
                <Input
                  placeholder="e.g. Vegetarian"
                  value={passenger.meal}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, meal: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
              <div>
                <Label>Hand Baggage</Label>
                <Input
                  placeholder="e.g. 7kg"
                  value={passenger.handBaggage}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, handBaggage: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
              <div>
                <Label>Check-in Baggage</Label>
                <Input
                  placeholder="e.g. 20kg"
                  value={passenger.checkInBaggage}
                  onChange={e => {
                    const newPassengers = [...formData.passengers]
                    newPassengers[index] = { ...passenger, checkInBaggage: e.target.value }
                    setFormData(prev => ({ ...prev, passengers: newPassengers }))
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flight Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Flight Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Airline</Label>
            <Input
              value={formData.flightDetails.airline}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, airline: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Flight Number</Label>
            <Input
              value={formData.flightDetails.flightNumber}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, flightNumber: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Duration</Label>
            <Input
              value={formData.flightDetails.duration}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, duration: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Departure Airport</Label>
            <Input
              value={formData.flightDetails.departureAirport}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, departureAirport: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Departure City</Label>
            <Input
              value={formData.flightDetails.departureCity}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, departureCity: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Departure Code</Label>
            <Input
              value={formData.flightDetails.departureCode}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, departureCode: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Departure Date & Time</Label>
            <Input
              type="datetime-local"
              value={formData.flightDetails.departureDateTime}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, departureDateTime: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Arrival Airport</Label>
            <Input
              value={formData.flightDetails.arrivalAirport}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, arrivalAirport: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Arrival City</Label>
            <Input
              value={formData.flightDetails.arrivalCity}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, arrivalCity: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Arrival Code</Label>
            <Input
              value={formData.flightDetails.arrivalCode}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, arrivalCode: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Arrival Date & Time</Label>
            <Input
              type="datetime-local"
              value={formData.flightDetails.arrivalDateTime}
              onChange={e => setFormData(prev => ({
                ...prev,
                flightDetails: { ...prev.flightDetails, arrivalDateTime: e.target.value }
              }))}
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Base Fare</Label>
            <Input
              type="number"
              value={formData.paymentDetails.baseFare}
              onChange={e => setFormData(prev => ({
                ...prev,
                paymentDetails: { ...prev.paymentDetails, baseFare: Number(e.target.value) }
              }))}
            />
          </div>
          <div>
            <Label>Taxes and Fees</Label>
            <Input
              type="number"
              value={formData.paymentDetails.taxes}
              onChange={e => setFormData(prev => ({
                ...prev,
                paymentDetails: { ...prev.paymentDetails, taxes: Number(e.target.value) }
              }))}
            />
          </div>
          <div>
            <Label>Convenience Fees</Label>
            <Input
              type="number"
              value={formData.paymentDetails.convenienceFees}
              onChange={e => setFormData(prev => ({
                ...prev,
                paymentDetails: { ...prev.paymentDetails, convenienceFees: Number(e.target.value) }
              }))}
            />
          </div>
          <div>
            <Label>Promo Code</Label>
            <Input
              value={formData.paymentDetails.promoCode}
              onChange={e => setFormData(prev => ({
                ...prev,
                paymentDetails: { ...prev.paymentDetails, promoCode: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label>Promo Discount</Label>
            <Input
              type="number"
              value={formData.paymentDetails.promoDiscount}
              onChange={e => setFormData(prev => ({
                ...prev,
                paymentDetails: { ...prev.paymentDetails, promoDiscount: Number(e.target.value) }
              }))}
            />
          </div>
          <div>
            <Label>Total Amount</Label>
            <Input
              type="number"
              value={formData.paymentDetails.totalAmount}
              onChange={e => setFormData(prev => ({
                ...prev,
                paymentDetails: { ...prev.paymentDetails, totalAmount: Number(e.target.value) }
              }))}
            />
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Notes</h3>
        <Textarea
          value={formData.additionalNotes}
          onChange={e => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
          placeholder="Enter any additional notes or special requests"
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full">
        Save Booking
      </Button>
    </form>
  )
}

