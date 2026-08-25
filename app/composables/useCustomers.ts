export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  location: string
  orders: number
  totalSpent: number
  joined: string
  status: 'Active' | 'Inactive'
  initials: string
}

const defaultCustomers: Customer[] = [
  {
    id: 1,
    name: 'Ayesha Khan',
    email: 'ayesha.khan@email.com',
    phone: '+92 300 1111111',
    location: 'Lahore, Pakistan',
    orders: 12,
    totalSpent: 1250,
    joined: 'January 15, 2026',
    status: 'Active',
    initials: 'AK'
  },
  {
    id: 2,
    name: 'Hassan Ali',
    email: 'hassan.ali@email.com',
    phone: '+92 301 2222222',
    location: 'Karachi, Pakistan',
    orders: 8,
    totalSpent: 890,
    joined: 'February 02, 2026',
    status: 'Active',
    initials: 'HA'
  },
  {
    id: 3,
    name: 'Sara Ahmed',
    email: 'sara.ahmed@email.com',
    phone: '+92 302 3333333',
    location: 'Islamabad, Pakistan',
    orders: 15,
    totalSpent: 1740,
    joined: 'March 10, 2026',
    status: 'Active',
    initials: 'SA'
  },
  {
    id: 4,
    name: 'Maham Fatima',
    email: 'maham.fatima@email.com',
    phone: '+92 303 4444444',
    location: 'Multan, Pakistan',
    orders: 5,
    totalSpent: 430,
    joined: 'April 18, 2026',
    status: 'Inactive',
    initials: 'MF'
  }
]

export const useCustomers = () => {
  const customers = useState<Customer[]>(
    'dashboard-customers',
    () => [...defaultCustomers]
  )

  const loadCustomers = () => {
    if (!import.meta.client) {
      return
    }

    const savedCustomers = localStorage.getItem(
      'dashboard-customers'
    )

    if (savedCustomers) {
      try {
        customers.value = JSON.parse(savedCustomers)
      }
      catch {
        customers.value = [...defaultCustomers]

        localStorage.setItem(
          'dashboard-customers',
          JSON.stringify(customers.value)
        )
      }
    }
    else {
      customers.value = [...defaultCustomers]

      localStorage.setItem(
        'dashboard-customers',
        JSON.stringify(customers.value)
      )
    }
  }

  const saveCustomers = () => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(
      'dashboard-customers',
      JSON.stringify(customers.value)
    )
  }

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      id: Date.now(),
      ...customer
    }

    customers.value.unshift(newCustomer)
    saveCustomers()

    return newCustomer
  }

  const updateCustomer = (
    id: number,
    updatedCustomer: Omit<Customer, 'id'>
  ) => {
    const index = customers.value.findIndex(
      customer => customer.id === id
    )

    if (index === -1) {
      return false
    }

    customers.value[index] = {
      id,
      ...updatedCustomer
    }

    saveCustomers()

    return true
  }

  const getCustomer = (id: number) => {
    return customers.value.find(
      customer => customer.id === id
    )
  }

  const totalCustomers = computed(() => {
    return customers.value.length
  })

  const activeCustomers = computed(() => {
    return customers.value.filter(
      customer => customer.status === 'Active'
    ).length
  })

  const inactiveCustomers = computed(() => {
    return customers.value.filter(
      customer => customer.status === 'Inactive'
    ).length
  })

  const totalRevenue = computed(() => {
    return customers.value.reduce(
      (total, customer) => total + customer.totalSpent,
      0
    )
  })

  return {
    customers,
    loadCustomers,
    saveCustomers,
    addCustomer,
    updateCustomer,
    getCustomer,
    totalCustomers,
    activeCustomers,
    inactiveCustomers,
    totalRevenue
  }
}
