import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationItem from '../NotificationItem.vue'
import { mockResponse } from '../../utils/mockData'
import type { Notification } from '../../types/NotificationsType'

describe('NotificationList', () => {
  it('renders without errors', async () => {
    const notification = mockResponse[0]

    const wrapper = mount(NotificationItem, {
      props: {
        notification: notification as Notification // Pass the notification as a prop
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays notification title and text', async () => {
    const notification = mockResponse[0]
    const wrapper = mount(NotificationItem, {
      props: {
        notification: notification as Notification // Pass the notification as a prop
      }
    })

    expect(wrapper.element.textContent).toContain(notification.title)
    expect(wrapper.element.textContent).toContain(notification.preview_text)
  })

  it('displays author and created date in uppercase', async () => {
    const notification = mockResponse[0]
    const wrapper = mount(NotificationItem, {
      props: {
        notification: notification as Notification // Pass the notification as a prop
      }
    })
    expect(wrapper.element.textContent).toContain(notification.author.toUpperCase())
    expect(wrapper.element.textContent).toContain(notification.created.toUpperCase())
  })
})
