export interface Notification {
  id: string
  title: string
  preview_text: string
  full_text: string
  author: string
  created: string
  read: boolean
  available_actions: string[]
}
