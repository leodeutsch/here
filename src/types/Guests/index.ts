export type GuestProps = {
  guest: GuestReq
  onRemove: () => void
  onCheck: () => void
}

export type GuestReq = {
  name: string
  enabled: boolean
}

export type GuestRes = {
  id: string
  name: string
  enabled: boolean
}
