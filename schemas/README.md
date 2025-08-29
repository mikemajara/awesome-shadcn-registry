# JSON Schemas

This directory contains JSON schemas for validating registry entries.

## library.json

Schema for component library entries in `registry/libraries/*/index.json`.

### Usage

Add the schema reference to your library's `index.json`:

```json
{
  "$schema": "../../../schemas/library.json",
  "name": "Your Library Name",
  // ... rest of your entry
}
```

### Benefits

- **IDE Support**: Autocompletion and validation in VS Code, IntelliJ, etc.
- **Documentation**: Built-in field descriptions and examples
- **Validation**: Automatic format and type checking
- **Consistency**: Ensures all entries follow the same structure

### Required Fields

- `name` - Library display name
- `description` - Brief description (10-500 chars)
- `author` - Author or organization
- `category` - Must be "libraries"
- `status` - "production", "beta", or "alpha"
- `license` - Software license (e.g., "MIT")
- `shadcnCompatible` - Must be `true`
- `registryUrl` - Registry endpoint URL
- `installCommand` - Must be "npx shadcn@latest add"
- `version` - Semantic version (e.g., "1.0.0")
- `lastUpdated` - Date in YYYY-MM-DD format

### Optional Fields

- `repository` - GitHub repository URL
- `homepage` - Official website URL
- `tags` - Array of descriptive tags
- `componentCount` - Approximate component count (e.g., "50+")
- `categories` - Available component categories
- `features` - Key features and capabilities
- `supportedNamespaces` - Supported installation namespaces

### Validation

Run validation with:
```bash
npm run validate
```

This checks all registry entries against the schema and reports any errors or warnings.