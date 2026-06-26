# Figma to Code + Playwright Agent

## Overview

This repository contains specialized GitHub Copilot agents that automate the entire workflow from Figma design to production-ready code with comprehensive test coverage. With a single prompt containing a Figma URL, these agents can:

- 🎨 **Extract designs from Figma** using the Figma MCP server
- ⚙️ **Generate .NET Web API endpoints** with controllers and models inferred from the design
- ⚛️ **Implement React UI components** that consume the API
- 🧪 **Write comprehensive Playwright E2E tests** for the entire stack
- ✅ **Validate everything works** by running the tests

## Agents Available

### 1. `Figma → .NET React + Playwright`
**File:** [`figma-to-code-playwright-dotnet.agent.md`](./figma-to-code-playwright-dotnet.agent.md)

**Full-stack agent** that generates:
- .NET Web API (ASP.NET Core controllers + models)
- React UI pages
- Playwright tests covering UI and API integration

**Use when:** You need the complete stack (backend + frontend + tests)

### 2. `Figma → Code + Playwright`
**File:** [`figma-to-code-playwright.agent.md`](./figma-to-code-playwright.agent.md)

**Frontend-focused agent** that generates:
- React UI pages
- Playwright E2E tests

**Use when:** You only need the frontend implementation and tests (API exists or not needed)

## Project Structure

These agents expect and maintain the following structure:

```
dotnet-react-app/
├── BankingApi/                     # .NET 8 Web API backend
│   ├── Controllers/                # API controllers
│   │   ├── ProductsController.cs
│   │   ├── JobsController.cs
│   │   └── PressReleasesController.cs
│   ├── Program.cs                  # App configuration with CORS and Swagger
│   ├── appsettings.json
│   └── BankingApi.csproj
│
├── client/                         # React frontend
│   ├── src/
│   │   ├── App.js                  # Main app with React Router
│   │   ├── App.css                 # Global styles
│   │   ├── index.js
│   │   └── pages/                  # Page components
│   │       ├── HomePage.js
│   │       ├── CareersPage.js
│   │       └── AboutPage.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── playwright-tests/               # E2E test suite
    ├── tests/                      # Test specifications
    │   ├── product-manager.spec.js
    │   ├── careers-page.spec.js
    │   ├── about-page.spec.js
    │   └── api-integration.spec.js
    ├── playwright.config.js        # Playwright configuration
    └── package.json
```

## Prerequisites

Before using these agents, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **.NET 8 SDK**
   - Download from [dot.net](https://dotnet.microsoft.com/download)
   - Verify: `dotnet --version`

3. **Visual Studio Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Install the **GitHub Copilot** extension

4. **Playwright Browsers** (installed during setup below)

### Required VS Code Extensions

- **GitHub Copilot** (required)
- **GitHub Copilot Chat** (required)

### Figma Access

- You need a **Figma account** and access to the designs you want to implement
- The Figma MCP server must be configured (see setup below)

## Project Setup

### 1. Clone or Create the Project

```bash
# If starting fresh
mkdir dotnet-react-app
cd dotnet-react-app
```

### 2. Set Up the .NET Backend

```bash
# Create the API project
dotnet new webapi -n BankingApi
cd BankingApi

# The project should have:
# - Program.cs with CORS configured for http://localhost:3000 and http://localhost:3001
# - Controllers folder for API endpoints
# - appsettings.json for configuration

cd ..
```

### 3. Set Up the React Frontend

```bash
# Create the React app
npx create-react-app client
cd client

# Install React Router for navigation
npm install react-router-dom

# Install axios for API calls (optional)
npm install axios

cd ..
```

### 4. Set Up Playwright Tests

```bash
# Create test directory
mkdir playwright-tests
cd playwright-tests

# Initialize package.json
npm init -y

# Install Playwright
npm install --save-dev @playwright/test

# Install Playwright browsers
npx playwright install

cd ..
```

### 5. Configure Figma MCP Server

Create `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "Figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### 6. Configure Playwright

Create `playwright-tests/playwright.config.js`:

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'cd ../client && npm start',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

## Using the Agents

### Quick Start (One Command)

The simplest way to use these agents is with a single prompt:

```
@Figma → .NET React + Playwright implement this design from Figma with playwright tests:
https://www.figma.com/design/abc123/YourBank?node-id=5-26176
```

This will:
1. ✅ Analyze your existing codebase
2. ✅ Fetch the Figma design
3. ✅ Generate .NET API controllers and models
4. ✅ Create React page components
5. ✅ Write comprehensive Playwright tests
6. ✅ Run and validate all tests pass

### Customizing the Scope

You can control what gets generated by being explicit in your prompt:

#### UI + API Only (No Tests)
```
@Figma → .NET React + Playwright implement this design without playwright tests:
https://www.figma.com/design/abc123/YourBank?node-id=5-26176
```

#### API Only
```
@Figma → .NET React + Playwright create the api from this design:
https://www.figma.com/design/abc123/YourBank?node-id=5-26176
```

#### UI Only (No API)
```
@Figma → .NET React + Playwright implement this design with no api:
https://www.figma.com/design/abc123/YourBank?node-id=5-26176
```

#### Tests Only (UI Already Exists)
```
@Figma → Code + Playwright implement the playwright tests for:
https://www.figma.com/design/abc123/YourBank?node-id=5-26176
```

## Running the Application

### Start the .NET API

```bash
cd BankingApi
dotnet run
```

The API will start on `http://localhost:5000` (or `https://localhost:5001` for HTTPS).

**Verify it's running:**
- Open `http://localhost:5000/swagger` in your browser
- You should see the Swagger UI with all API endpoints

### Start the React Frontend

```bash
cd client
npm start
```

The React app will start on `http://localhost:3000` or `http://localhost:3001`.

**Verify it's running:**
- The browser should automatically open
- You should see the home page

### Run Playwright Tests

#### Run All Tests

```bash
cd playwright-tests
npm test
```

#### Run Specific Test File

```bash
npx playwright test tests/careers-page.spec.js
```

#### Run Tests in UI Mode (Interactive)

```bash
npx playwright test --ui
```

#### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

#### View Last Test Report

```bash
npx playwright show-report
```

## What the Agent Generates

### .NET API Components

For designs with data-driven content (lists, grids, cards), the agent generates:

**Controller** (`BankingApi/Controllers/[Resource]Controller.cs`):
```csharp
[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private static List<JobOpening> _jobs = new List<JobOpening> { /* ... */ };
    
    [HttpGet]
    public ActionResult<IEnumerable<JobOpening>> GetAll() => Ok(_jobs);
    
    [HttpGet("{id}")]
    public ActionResult<JobOpening> GetById(int id) { /* ... */ }
    
    [HttpPost]
    public ActionResult<JobOpening> Create(JobOpening job) { /* ... */ }
}
```

**Model** (same file):
```csharp
public class JobOpening
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    // ... other properties from design
}
```

### React Components

**Page Component** (`client/src/pages/[PageName].js`):
```javascript
import React, { useState, useEffect } from 'react';

function PageName() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="page-name">
      {/* Sections matching Figma design */}
    </div>
  );
}

export default PageName;
```

**Router Update** (`client/src/App.js`):
```javascript
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PageName from './pages/PageName';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/page">Page</Link>
      </nav>
      <Routes>
        <Route path="/page" element={<PageName />} />
        {/* Existing routes preserved */}
      </Routes>
    </Router>
  );
}
```

### Playwright Tests

**Test Specification** (`playwright-tests/tests/page-name.spec.js`):
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Page Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/page');
  });
  
  test('should display navbar', async ({ page }) => {
    const navbar = page.locator('[data-testid="navbar"]');
    await expect(navbar).toBeVisible();
  });
  
  test('should display hero section', async ({ page }) => {
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Expected Heading');
  });
  
  test('should handle tab interactions', async ({ page }) => {
    await page.click('[data-testid="tab-1"]');
    await expect(page.locator('[data-testid="tab-content-1"]')).toBeVisible();
  });
  
  // ... more tests
});
```

## Key Features

### 🎯 Design Fidelity
- Extracts exact colors, typography, spacing from Figma
- Matches layout pixel-perfectly using CSS Grid and Flexbox
- Preserves design tokens and theme consistency

### 🔄 Smart Routing
- Detects existing React Router setup
- Creates new routes without breaking existing pages
- Updates navigation automatically

### 🧪 Comprehensive Testing
- Tests every section for visibility and content
- Validates interactive elements (tabs, accordions, modals)
- Includes API integration tests
- Uses `data-testid` for stable selectors

### 📦 API Generation
- Models inferred from design content
- Seeded with actual data from Figma
- Follows REST conventions (GET, POST, PUT, DELETE)
- Maintains in-memory storage pattern

### ♻️ Incremental Development
- Preserves existing code
- Adds new features without breaking old ones
- Follows project conventions


## Examples

### Example 1: Careers Page (Full Stack)

**Prompt:**
```
@Figma → .NET React + Playwright implement this careers page with playwright tests:
https://www.figma.com/design/abc123/YourBank?node-id=5-26176
```

**Generated:**
- ✅ `BankingApi/Controllers/JobsController.cs` with JobOpening model
- ✅ `client/src/pages/CareersPage.js` with job listings
- ✅ `playwright-tests/tests/careers-page.spec.js` with 50+ tests
- ✅ Route added to App.js: `/careers`

### Example 2: About Page (No API Needed)

**Prompt:**
```
@Figma → Code + Playwright implement this about page without api:
https://www.figma.com/design/abc123/YourBank?node-id=6-12345
```

**Generated:**
- ✅ `client/src/pages/AboutPage.js` with static content
- ✅ `playwright-tests/tests/about-page.spec.js` with tests
- ✅ Route added to App.js: `/about`

### Example 3: Product Dashboard (API Only)

**Prompt:**
```
@Figma → .NET React + Playwright create the api only from this dashboard:
https://www.figma.com/design/abc123/Dashboard?node-id=7-89012
```

**Generated:**
- ✅ `BankingApi/Controllers/ProductsController.cs` with Product model
- ✅ Full CRUD endpoints (GET, POST, PUT, DELETE)

## Best Practices

### When Creating Designs in Figma

1. **Use clear layer names** - Helps the agent understand structure
2. **Group related elements** - Makes section detection easier
3. **Include all states** - Tabs, accordions, hover states
4. **Use consistent spacing** - Agent will extract these values
5. **Include real content** - Better than Lorem Ipsum for generating APIs

### When Using the Agent

1. **Start with a specific node** - Don't point to the entire Figma file
2. **Be explicit about scope** - Say "with tests" or "UI only" if needed
3. **One page at a time** - Don't try to implement multiple pages in one prompt
4. **Review generated code** - The agent is smart but not perfect
5. **Run tests after generation** - Fix any failures immediately

## Resources

### Documentation
- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [React Documentation](https://react.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Figma for Developers](https://www.figma.com/developers)

### Related Tools
- [Figma MCP Server](https://github.com/figma/mcp)
- [GitHub Copilot](https://github.com/features/copilot)
- [React Router](https://reactrouter.com/)

---

**Built using GitHub Copilot and Figma MCP**
