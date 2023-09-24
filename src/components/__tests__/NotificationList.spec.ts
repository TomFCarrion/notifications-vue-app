import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationList from '../NotificationList.vue'
import { mockResponse } from '../../utils/mockData'

describe('NotificationList', () => {
  it('renders without errors', async () => {
    const wrapper = mount(NotificationList)
    await wrapper.setProps({ notifications: mockResponse })

    expect(wrapper.exists()).toBe(true)
  })

  it('renders notifications received via props', async () => {
    const wrapper = mount(NotificationList)

    await wrapper.setProps({ notifications: mockResponse })

    expect(wrapper.findAll('.notification')).toHaveLength(mockResponse.length)

    mockResponse.forEach((notification) => {
      expect(wrapper.find(`[data-test-id="${notification.id}"]`).text()).toContain(
        notification.title
      )
    })
  })
})
