# Figma → Code + Playwright Agent

This custom agent is specifically designed for .NET + React + Playwright projects. It implements Figma designs into your React client app and generates comprehensive Playwright tests with zero configuration needed.

## What It Does

✅ **Analyzes your .NET + React project structure** automatically  
✅ **Fetches designs from Figma** using the Figma MCP integration  
✅ **Implements UI** as new page components with React Router  
✅ **Preserves existing pages** (never deletes your home page!)  
✅ **Generates comprehensive Playwright tests** (50+ tests per page)  
✅ **Ensures all tests pass** before finishing  
✅ **Handles Windows PowerShell quirks** (npm PATH issues, etc.)  

## How to Use

### 1. Get Your Figma URL

You need a Figma URL with a specific node-id:
```
https://www.figma.com/design/FILEID/FILENAME?node-id=49-25
```

**Important:** Make sure your URL has `node-id=X-Y` in it!

### 2. Invoke the Agent

In GitHub Copilot Chat, type:

```
@Figma → Code + Playwright
https://www.figma.com/design/YOUR-FILE/YOUR-DESIGN?node-id=49-25
with playwright test
```

**Variations:**
- **UI + Tests (default):** Just paste the URL
- **UI only:** Add "with no playwright test" or "UI only"
- **Tests only:** Say "implement the playwright test" or "just the tests"

### 3. Sit Back and Watch

The agent will:
1. ✅ Analyze your project structure
2. ✅ Fetch the Figma design
3. ✅ Create a new page component (e.g., `CareersPage.js`)
4. ✅ Add routing to `App.js`
5. ✅ Update the navbar with a link
6. ✅ Generate 50+ Playwright tests
7. ✅ Start your React dev server
8. ✅ Run all tests and ensure they pass

## What You Get

### React UI

**New files created:**
- `client/src/pages/[PageName].js` - Your new page component
- Styles added to `client/src/App.css`
- Route added to `client/src/App.js`

**Features:**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme with accent colors
- ✅ Interactive elements (tabs, accordions, menus)
- ✅ All sections have `data-testid` attributes
- ✅ Follows your existing project structure
- ✅ Preserves your existing pages

### Playwright Tests

**New file created:**
- `playwright-tests/tests/[page-name].spec.js`

**Test coverage:**
- ✅ Navbar (logo, buttons, mobile menu, sticky position)
- ✅ Hero section (heading, description, image)
- ✅ Content sections (features, benefits, values, etc.)
- ✅ Interactive elements (tabs, accordions, forms)
- ✅ Footer (logo, links, social media, copyright)
- ✅ Theme validation (colors, fonts)
- ✅ Responsive behavior

## Project Structure

The agent expects this structure:

```
your-project/
├── SampleApi/                  # .NET backend
│   ├── Controllers/
│   ├── Program.cs
│   └── SampleApi.csproj
├── client/                     # React frontend
│   ├── src/
│   │   ├── App.js             # Routing configured here
│   │   ├── App.css            # Global styles
│   │   ├── pages/             # HomePage.js, CareersPage.js, etc.
│   │   └── index.js
│   └── package.json
└── playwright-tests/          # E2E tests
    ├── tests/
    │   ├── careers-page.spec.js
    │   └── ...
    ├── playwright.config.js
    └── package.json
```

## Troubleshooting

### "npm command not found" on Windows

The agent automatically handles this by using full Node.js paths:
```powershell
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
```

### Port already in use

If port 3000 is occupied, React will prompt for an alternate port (3001).  
The agent automatically updates `playwright.config.js` to match.

### Tests are failing

The agent will:
1. Read the error messages
2. Fix missing `data-testid` attributes
3. Fix CSS visibility issues
4. Fix wrong routes in tests
5. Re-run until all tests pass

If stuck, it will explain the blocker to you.

### Compilation errors

Check the React dev server terminal for errors:
- Missing imports → Agent will fix
- Wrong CSS paths → Agent will use relative paths (`../App.css`)
- Syntax errors → Agent will correct them

## Best Practices

### DO ✅

- Provide a Figma URL with a specific `node-id`
- Let the agent finish completely (don't interrupt)
- Review the generated code after completion
- Run tests manually after changes: `cd playwright-tests && npm test`

### DON'T ❌

- Don't provide a Figma URL without `node-id`
- Don't modify files while the agent is working
- Don't skip tests if you asked for them
- Don't delete existing pages manually

## Example Session

```
User: @Figma → Code + Playwright
      https://www.figma.com/design/abc123/Bank-Careers?node-id=49-25
      with playwright test

Agent: ✅ Analyzing project structure...
       ✅ Found React 18.2.0 with React Router
       ✅ Fetching Figma design (node 49:25)...
       ✅ Creating CareersPage.js...
       ✅ Adding route to App.js...
       ✅ Updating navbar with /careers link...
       ✅ Generating 50 Playwright tests...
       ✅ Starting React dev server (port 3001)...
       ✅ Running tests... 50/50 passing ✅

       Summary:
       - New page: client/src/pages/CareersPage.js
       - Route: /careers
       - Tests: 50/50 passing
       - Dev server: http://localhost:3001/careers
```

## Advanced Usage

### Multiple Pages from Figma

Run the agent once per page:

```
1. @Figma → Code + Playwright [careers URL] with playwright test
2. @Figma → Code + Playwright [about URL] with playwright test
3. @Figma → Code + Playwright [contact URL] with playwright test
```

Each run will:
- Create a new page component
- Add a new route
- Generate separate test file
- Preserve all previous pages

### Custom Test Adjustments

After the agent finishes, you can:
1. Add more test cases to the generated spec file
2. Adjust assertions for your specific needs
3. Add API integration tests
4. Test with real backend data

### Styling Customization

The agent adds styles to `App.css`. You can:
1. Move them to separate CSS files
2. Convert to CSS Modules
3. Add Tailwind classes
4. Refactor to styled-components

The `data-testid` attributes remain stable, so tests still pass.

## Support

If you encounter issues:
1. Check this README
2. Look at the agent's terminal output for errors
3. Verify your Figma URL has a `node-id`
4. Ensure your project matches the expected structure

## Agent Configuration

Location: `.github/agents/figma-to-code-playwright.agent.md`

To customize:
- Edit the `applyTo` glob patterns
- Adjust test coverage requirements
- Modify the output format
- Add project-specific conventions

---

**Made with ❤️ for .NET + React + Playwright developers**
