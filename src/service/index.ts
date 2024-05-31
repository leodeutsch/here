import axios from 'axios'
import { api } from '../server'
import { GuestReq, GuestRes } from '../types/Guests'

export const addGuest = async (guest: GuestReq) => {
  return await api.post('/guests', guest)
}

export const getGuests = async () => {
  return await api.get('/guests')
}

export const updateGuest = async (guest: GuestRes) => {
  return await axios.put(`/guests/${guest.id}`, { guest })
}

export const deleteGuest = async (guestId: string) => {
  return await axios.put(`/guests/${guestId}`)
}
