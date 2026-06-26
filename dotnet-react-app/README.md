# Product Manager - .NET Core + React Application

A full-stack web application demonstrating a Product Manager system built with .NET Core Web API backend and React frontend.

## Project Structure

```
dotnet-react-app/
├── BankingApi/              # .NET Core Web API
│   ├── Controllers/        # API Controllers
│   ├── Program.cs         # Application entry point
│   ├── BankingApi.csproj   # Project file
│   └── appsettings.json   # Configuration
└── client/                # React Frontend
    ├── public/            # Static files
    ├── src/              # React components
    │   ├── App.js        # Main application component
    │   ├── App.css       # Application styles
    │   ├── index.js      # React entry point
    │   └── index.css     # Global styles
    └── package.json      # Node dependencies
```

## Features

### Backend API (.NET Core)
- RESTful API with CRUD operations
- Product management endpoints
- CORS enabled for React frontend
- Swagger/OpenAPI documentation
- In-memory data storage

### Frontend (React)
- Modern React with Hooks
- Product listing with grid layout
- Add/Edit/Delete product functionality
- Form validation
- Responsive design
- Axios for API communication
- Beautiful gradient UI

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js)

## Getting Started

### 1. Setup Backend API

Navigate to the API directory:
```bash
cd dotnet-react-app/BankingApi
```

Restore dependencies:
```bash
dotnet restore
```

Run the API:
```bash
dotnet run
```

The API will start on `http://localhost:5000` (or `https://localhost:5001` for HTTPS).

**API Endpoints:**
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

Access Swagger UI at: `http://localhost:5000/swagger`

### 2. Setup React Frontend

Open a new terminal and navigate to the client directory:
```bash
cd dotnet-react-app/client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

The React app will open in your browser at `http://localhost:3000`.

## Usage

1. **View Products**: The application displays all products in a grid layout
2. **Add Product**: Click "Add New Product" button, fill in the form, and submit
3. **Edit Product**: Click "Edit" button on any product card, modify details, and save
4. **Delete Product**: Click "Delete" button on any product card and confirm

## API Examples

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Create a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "price": 99.99,
    "category": "Electronics"
  }'
```

### Update a Product
```bash
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "price": 149.99,
    "category": "Electronics"
  }'
```

### Delete a Product
```bash
curl -X DELETE http://localhost:5000/api/products/1
```

## Development

### Backend Development
- The API uses in-memory storage, so data resets on restart
- Modify [`Program.cs`](BankingApi/Program.cs) for configuration changes
- Add new controllers in the [`Controllers`](BankingApi/Controllers/) directory
- CORS is configured to allow requests from `http://localhost:3000`

### Frontend Development
- React app uses functional components with Hooks
- API base URL is configured in [`App.js`](client/src/App.js)
- Modify [`App.css`](client/src/App.css) for styling changes
- All API calls use Axios for HTTP requests

## Building for Production

### Backend
```bash
cd BankingApi
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd client
npm run build
```

The production build will be in the `client/build` directory.

## Troubleshooting

### API not accessible from React
- Ensure the API is running on port 5000
- Check CORS configuration in [`Program.cs`](BankingApi/Program.cs)
- Verify the API base URL in [`App.js`](client/src/App.js)

### Port already in use
- Change the port in `launchSettings.json` (API)
- React will prompt to use a different port automatically

## Technologies Used

### Backend
- .NET 8.0
- ASP.NET Core Web API
- Swashbuckle (Swagger)

### Frontend
- React 18
- Axios
- CSS3 with Flexbox/Grid

## License

This is a sample project for demonstration purposes.