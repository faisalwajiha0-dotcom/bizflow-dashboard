export interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  icon: string
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'WH-001',
    category: 'Electronics',
    price: 129,
    stock: 48,
    icon: '🎧'
  },
  {
    id: 2,
    name: 'Smart Watch',
    sku: 'SW-002',
    category: 'Electronics',
    price: 189,
    stock: 32,
    icon: '⌚'
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    sku: 'MK-003',
    category: 'Accessories',
    price: 75,
    stock: 9,
    icon: '⌨️'
  },
  {
    id: 4,
    name: 'Laptop Stand',
    sku: 'LS-004',
    category: 'Accessories',
    price: 65,
    stock: 0,
    icon: '💻'
  }
]

export const useProducts = () => {
  const products = useState<Product[]>('bizflow-products', () => [])

  const loadProducts = () => {
    if (!import.meta.client) {
      return
    }

    const savedProducts = localStorage.getItem('bizflow-products')

    if (savedProducts) {
      try {
        products.value = JSON.parse(savedProducts)
      }
      catch {
        products.value = [...defaultProducts]
        localStorage.setItem(
          'bizflow-products',
          JSON.stringify(products.value)
        )
      }
    }
    else {
      products.value = [...defaultProducts]

      localStorage.setItem(
        'bizflow-products',
        JSON.stringify(products.value)
      )
    }
  }

  const saveProducts = () => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(
      'bizflow-products',
      JSON.stringify(products.value)
    )
  }

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now(),
      ...product
    }

    products.value.push(newProduct)
    saveProducts()

    return newProduct
  }

  const updateProduct = (
    id: number,
    updatedProduct: Omit<Product, 'id'>
  ) => {
    const index = products.value.findIndex(
      product => product.id === id
    )

    if (index === -1) {
      return false
    }

    products.value[index] = {
      id,
      ...updatedProduct
    }

    saveProducts()

    return true
  }

  const deleteProduct = (id: number) => {
    products.value = products.value.filter(
      product => product.id !== id
    )

    saveProducts()
  }

  const getProduct = (id: number) => {
    return products.value.find(
      product => product.id === id
    )
  }

  const totalProducts = computed(() => {
    return products.value.length
  })

  const inStockProducts = computed(() => {
    return products.value.filter(
      product => product.stock > 10
    ).length
  })

  const lowStockProducts = computed(() => {
    return products.value.filter(
      product => product.stock > 0 && product.stock <= 10
    ).length
  })

  const outOfStockProducts = computed(() => {
    return products.value.filter(
      product => product.stock === 0
    ).length
  })

  return {
    products,
    loadProducts,
    saveProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    totalProducts,
    inStockProducts,
    lowStockProducts,
    outOfStockProducts
  }
}
