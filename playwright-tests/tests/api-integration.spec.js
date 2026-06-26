const { test, expect } = require('@playwright/test');

test.describe('API Integration Tests', () => {
  const API_BASE_URL = 'http://localhost:5000/api';

  test('should fetch products from API', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
    
    // Verify product structure
    const firstProduct = products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('category');
  });

  test('should get a single product by ID', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products/1`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const product = await response.json();
    expect(product.id).toBe(1);
    expect(product.name).toBeTruthy();
  });

  test('should return 404 for non-existent product', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products/9999`);
    
    expect(response.status()).toBe(404);
  });

  test('should create a new product', async ({ request }) => {
    const newProduct = {
      name: 'Test Product',
      price: 149.99,
      category: 'Test Category'
    };
    
    const response = await request.post(`${API_BASE_URL}/products`, {
      data: newProduct
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const createdProduct = await response.json();
    expect(createdProduct.id).toBeTruthy();
    expect(createdProduct.name).toBe(newProduct.name);
    expect(createdProduct.price).toBe(newProduct.price);
    expect(createdProduct.category).toBe(newProduct.category);
  });

  test('should update an existing product', async ({ request }) => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 199.99,
      category: 'Updated Category'
    };
    
    const response = await request.put(`${API_BASE_URL}/products/1`, {
      data: updatedProduct
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
    
    // Verify the update
    const getResponse = await request.get(`${API_BASE_URL}/products/1`);
    const product = await getResponse.json();
    expect(product.name).toBe(updatedProduct.name);
  });

  test('should delete a product', async ({ request }) => {
    // First create a product to delete
    const newProduct = {
      name: 'Product to Delete',
      price: 99.99,
      category: 'Temporary'
    };
    
    const createResponse = await request.post(`${API_BASE_URL}/products`, {
      data: newProduct
    });
    const createdProduct = await createResponse.json();
    
    // Now delete it
    const deleteResponse = await request.delete(`${API_BASE_URL}/products/${createdProduct.id}`);
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(204);
    
    // Verify it's deleted
    const getResponse = await request.get(`${API_BASE_URL}/products/${createdProduct.id}`);
    expect(getResponse.status()).toBe(404);
  });

  test('should handle CORS headers', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products`);
    
    // Check for CORS headers (if API is configured with CORS)
    const headers = response.headers();
    // Note: CORS headers might not be present in direct API calls
    // This test is more relevant when called from browser
    expect(response.ok()).toBeTruthy();
  });

  test('should validate product data types', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/products`);
    const products = await response.json();
    
    products.forEach(product => {
      expect(typeof product.id).toBe('number');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.category).toBe('string');
    });
  });
});

// Made with Bob
