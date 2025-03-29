const ProductService = {
  getAllProducts: async () => {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  },

  createProduct: async (productData) => {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  },
};

const UserService = {
  registerUser: async (userData) => {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error('Failed to register user');
    return await response.json();
  },

  loginUser: async (email, password) => {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Invalid credentials');
    return await response.json();
  },
};

const OrderService = {
  createOrder: async (orderData) => {
    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  },

  getOrdersByUser: async (userId) => {
    const response = await fetch(`http://localhost:3001/api/orders/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  },
};

export { ProductService, UserService, OrderService };
