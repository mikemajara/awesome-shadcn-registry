# Registry

This directory contains structured metadata for shadcn-compatible component libraries, registries, and tools.

## Structure

```
registry/
├── libraries/       # Component libraries with shadcn registries
├── registries/      # Third-party registries and custom implementations  
└── tools/           # Development tools for building registries
```

## Entry Requirements

Each registry entry must represent a resource that:
- Implements the shadcn/ui registry specification
- Supports `npx shadcn@latest add <component>` installation
- Provides valid component metadata and dependencies
- Maintains compatibility with shadcn/ui standards

Each entry should follow the format defined in the [contributing guidelines](../CONTRIBUTING.md).