export type JobPosition = 'STUDENT' | 'TEACHER' | 'TECHNICIAN' | 'ADMIN'
export type DeviceType = 'PC' | 'NOTEBOOK' | 'PRINTER' | 'OTHER'
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Person {
  id: string
  name: string
  email: string
  jobPosition: JobPosition
  createdAt: string
  updatedAt: string
}

export interface Room {
  id: string
  name: string
  floor: number
  createdAt: string
  updatedAt: string
}

export interface Device {
  id: string
  name: string
  type: DeviceType
  serialNumber?: string
  roomId: string
  room?: Room
  createdAt: string
  updatedAt: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  deviceId?: string
  device?: Device
  assignedPersonId: string
  assignedPerson?: Person
  createdAt: string
  updatedAt: string
}

export interface ApiError {
  message: string
  statusCode?: number
}

export interface CreatePersonDto {
  name: string
  email: string
  jobPosition: JobPosition
}

export interface CreateRoomDto {
  name: string
  floor: number
}

export interface CreateDeviceDto {
  name: string
  type: DeviceType
  serialNumber?: string
  roomId: string
}

export interface CreateTicketDto {
  title: string
  description: string
  status?: TicketStatus
  priority?: TicketPriority
  deviceId?: string
  assignedPersonId: string
}
