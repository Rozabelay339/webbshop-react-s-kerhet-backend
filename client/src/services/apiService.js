const BASE_URL = "http://localhost:3001/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || `HTTP error! Status: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return null;
};

const ProductService = {
  getAllProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    return handleResponse(response);
  },

  getProductById: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  getProductByName: async (name) => {
    const response = await fetch(`${BASE_URL}/products/name/${encodeURIComponent(name)}`);
    return handleResponse(response);
  },

  createProduct: async (productData) => {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    return handleResponse(response);
  },

  // Add this function to fetch products by category
  getProductsByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
    return handleResponse(response);
  },
};


const UserService = {
  registerUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/users/register`, {  // ✅ changed 'auth' → 'users'
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  loginUser: async (email, password) => {
    const response = await fetch(`${BASE_URL}/users/login`, {  // ✅ changed 'auth' → 'users'
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    return { token: data.token, userData: { id: data._id, name: data.name, email: data.email } };
  },
};


const OrderService = {
  createOrder: async (orderData, token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  getAllOrders: async (token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getOrdersByUserId: async (userId, token) => {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  getOrderById: async (orderId, token) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  deleteAllOrders: async (token) => {
    const response = await fetch(`${BASE_URL}/orders/all`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  deleteOrderById: async (orderId, token) => {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },
};

export { ProductService, UserService, OrderService };
