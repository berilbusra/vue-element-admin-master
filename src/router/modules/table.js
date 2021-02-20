/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    },
    {
      path: 'my-table',
      component: () => import('@/views/table/my-table'),
      name: 'MyTable',
      meta: { title: 'My Table' }
    },
    {
      path: 'company-table',
      component: () => import('@/views/table/company-table'),
      name: 'CompanyTable',
      meta: { title: 'Company Table' }
    },
    {
      path: 'food-task-table',
      component: () => import('@/views/table/food-task-table'),
      name: 'FoodTaskTable',
      meta: { title: 'Food Task Table' }
    }
  ]
}
export default tableRouter
