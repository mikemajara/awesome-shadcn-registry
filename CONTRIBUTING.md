# Contributing to Awesome shadcn Registry

Thank you for your interest in contributing! This guide will help you add shadcn-compatible component libraries and registries to our collection.

## What We're Looking For

This registry focuses specifically on:
- **Component Libraries** that implement the shadcn/ui registry specification
- **Third-Party Registries** that extend the shadcn ecosystem
- **Development Tools** for building shadcn-compatible registries

## Requirements for Inclusion

Your submission must meet ALL of these criteria:

- ✅ **Implements shadcn registry format** - Users can install components via `npx shadcn@latest add`
- ✅ **Provides valid registry URL** - A working endpoint that serves component metadata
- ✅ **Includes component metadata** - Proper dependencies, styling, and configuration
- ✅ **Maintains compatibility** - Works with the latest shadcn/ui standards
- ✅ **Has documentation** - Clear installation and usage instructions

## How to Contribute

1. Fork this repository
2. Create a new branch for your contribution
3. Add your library to the appropriate section in README.md
4. Create a registry entry in the `registry/` directory
5. Test your entry using our validation script
6. Submit a pull request

## Registry Structure

```
registry/
├── libraries/        # Component libraries with shadcn registries
│   └── your-library/
│       └── index.json
├── registries/       # Third-party registries  
│   └── your-registry/
│       └── index.json
└── tools/           # Development tools for registries
    └── your-tool/
        └── index.json
```

## Registry Entry Format

### For Component Libraries (`registry/libraries/`)

```json
{
  "name": "Your Library Name",
  "description": "Brief description of the component library",
  "author": "Author Name",
  "repository": "https://github.com/username/repo",
  "homepage": "https://yourlibrary.com/",
  "registryUrl": "https://yourlibrary.com/r",
  "installCommand": "npx shadcn@latest add",
  "tags": ["react", "tailwind", "typescript"],
  "category": "libraries",
  "status": "production|beta|alpha",
  "license": "MIT",
  "shadcnCompatible": true,
  "componentCount": "50+",
  "features": [
    "TypeScript support",
    "Tailwind CSS integration",
    "Dark mode support"
  ],
  "version": "1.0.0",
  "lastUpdated": "2025-01-15"
}
```

### For Third-Party Registries (`registry/registries/`)

```json
{
  "name": "Your Registry Name",
  "description": "Custom registry that extends shadcn ecosystem",
  "author": "Author Name",
  "repository": "https://github.com/username/registry",
  "homepage": "https://yourregistry.com/",
  "registryUrl": "https://yourregistry.com/api/{name}.json",
  "installCommand": "npx shadcn@latest add @yourregistry/",
  "tags": ["registry", "custom", "extension"],
  "category": "registries",
  "status": "production",
  "license": "MIT",
  "shadcnCompatible": true,
  "supportedNamespaces": ["@yourregistry"],
  "version": "1.0.0",
  "lastUpdated": "2025-01-15"
}
```

## Validation

Before submitting, run our validation script:

```bash
npm run validate
```

This will check that your registry entry follows the correct format and includes all required fields.

## Guidelines

- **Registry URL must be functional** - We'll test component installation
- **Provide accurate component counts** - Use ranges like "50+" for large collections
- **Include meaningful tags** - Help users discover relevant libraries
- **Set appropriate status** - Be honest about production readiness
- **Test installation process** - Ensure `npx shadcn@latest add` works correctly
- **Update lastUpdated field** - Use YYYY-MM-DD format

## Testing Your Submission

1. Test component installation: `npx shadcn@latest add your-component`
2. Verify registry URL responds with valid JSON
3. Check that components work in a fresh shadcn/ui project
4. Ensure documentation is clear and complete