export interface Guest {
  name: string
  enabled: boolean
}

export interface GuestRes extends Guest {
  id: string
}

export interface GuestProps {
  guest: GuestRes
  onRemove: () => void
  onCheck: () => void
}
