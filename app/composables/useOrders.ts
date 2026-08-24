export interface Order {
  id: string
  customer: string
  email: string
  product: string
  date: string
  amount: string
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  initials: string
  avatar: string
}

const defaultOrders: Order[] = [
  {
    id: '#ORD-1048',
    customer: 'Ayesha Khan',
    email: 'ayesha.khan@email.com',
    product: 'Wireless Headphones',
    date: 'Aug 22, 2026',
    amount: '$129.00',
    status: 'Delivered',
    initials: 'AK',
    avatar: 'bg-blue-100 text-[#2879D8]'
  },
  {
    id: '#ORD-1047',
    customer: 'Hassan Ali',
    email: 'hassan.ali@email.com',
    product: 'Smart Watch',
    date: 'Aug 22, 2026',
    amount: '$189.00',
    status: 'Processing',
    initials: 'HA',
    avatar: 'bg-purple-100 text-purple-600'
  },
  {
    id: '#ORD-1046',
    customer: 'Sara Ahmed',
    email: 'sara.ahmed@email.com',
    product: 'Mechanical Keyboard',
    date: 'Aug 21, 2026',
    amount: '$75.00',
    status: 'Shipped',
    initials: 'SA',
    avatar: 'bg-emerald-100 text-emerald-600'
  },
  {
    id: '#ORD-1045',
    customer: 'Maham Fatima',
    email: 'maham.fatima@email.com',
    product: 'Laptop Stand',
    date: 'Aug 21, 2026',
    amount: '$65.00',
    status: 'Pending',
    initials: 'MF',
    avatar: 'bg-pink-100 text-pink-600'
  },
  {
    id: '#ORD-1044',
    customer: 'Usman Tariq',
    email: 'usman.tariq@email.com',
    product: 'Wireless Headphones',
    date: 'Aug 20, 2026',
    amount: '$258.00',
    status: 'Cancelled',
    initials: 'UT',
    avatar: 'bg-orange-100 text-orange-600'
  }
]

export const useOrders = () => {
  const orders = useState<Order[]>('dashboard-orders', () => [
    ...defaultOrders
  ])

  const loadOrders = () => {
    if (!import.meta.client) {
      return
    }

    const savedOrders = localStorage.getItem('dashboard-orders')

    if (savedOrders) {
      try {
        orders.value = JSON.parse(savedOrders)
      }
      catch {
        orders.value = [...defaultOrders]
        saveOrders()
      }
    }
    else {
      orders.value = [...defaultOrders]
      saveOrders()
    }
  }

  const saveOrders = () => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(
      'dashboard-orders',
      JSON.stringify(orders.value)
    )
  }

  const updateOrderStatus = (
    id: string,
    status: Order['status']
  ) => {
    const order = orders.value.find(order => order.id === id)

    if (!order) {
      return false
    }

    order.status = status
    saveOrders()

    return true
  }
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      id: `#ORD-${Date.now().toString().slice(-4)}`,
      ...order
    }

    orders.value.unshift(newOrder)
    saveOrders()

    return newOrder
  }

  const deleteOrder = (id: string) => {
    orders.value = orders.value.filter(
      order => order.id !== id
    )

    saveOrders()
  }

  const getOrder = (id: string) => {
    return orders.value.find(
      order => order.id === id
    )
  }

  return {
    orders,
    loadOrders,
    saveOrders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    getOrder
  }
}
