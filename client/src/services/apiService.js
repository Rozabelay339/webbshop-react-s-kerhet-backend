const ProductService = {
  getAllProducts: async () => {
    const response = await fetch('http://localhost:3001/api/products');
    const text = await response.text(); // Log the raw response body
    console.log(text); // Log the response body
    if (!response.ok) throw new Error('Failed to fetch products');
    return JSON.parse(text); // Manually parse the text if necessary
  },

  getProductById: async (id) => {
    const response = await fetch(`http://localhost:3001/api/products/${id}`);
    const text = await response.text();
    console.log(text);
    if (!response.ok) throw new Error('Failed to fetch product');
    return JSON.parse(text);
  },
  
  createProduct: async (productData) => {
    const response = await fetch('http://localhost:3001/api/products', {
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
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login Response:", data); // Debugging

    if (!response.ok) throw new Error(data.message || "Login failed");

    return { token: data.token, userData: { id: data._id, name: data.name, email: data.email } };
  },
};

const OrderService = {
  createOrder: async (orderData) => {
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to create order');
      }

      return await response.json();
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  },

  getAllOrders: async () => {
    const response = await fetch('http://localhost:3001/api/orders');
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  },

  getOrdersByUserName: async (userName) => {
    const response = await fetch(`http://localhost:3001/api/orders/user/${encodeURIComponent(userName)}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  },

  getOrderById: async (orderId) => {
    const response = await fetch(`http://localhost:3001/api/orders/${orderId}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return await response.json();
  },

  deleteAllOrders: async () => {
    const response = await fetch('http://localhost:3001/api/orders/all', {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete all orders');
    return await response.json();
  },

  deleteOrderById: async (orderId) => {
    const response = await fetch(`http://localhost:3001/api/orders/${orderId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
    return await response.json();
  },
};


export { ProductService, UserService, OrderService };
