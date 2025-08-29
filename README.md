# Awesome shadcn Registry

A curated list of component libraries and registries that implement the shadcn/ui registry format, allowing users to install components via `npx shadcn@latest add <component>`.

Start using your badge to show off your repo implements the shadcn registry standard

<a href="https://ui.shadcn.com/docs/registry"><img alt="Shadcn Registry" src="https://img.shields.io/badge/registry-ready-green?style=flat-square&logo=shadcnui"></a>

## What is a shadcn Registry?

A shadcn registry is a collection of components that follows the shadcn/ui registry specification, enabling seamless component installation through the shadcn CLI. Users can add components directly to their projects using:

```bash
npx shadcn@latest add <component-name>
```

## Contents

- [Awesome shadcn Registry](#awesome-shadcn-registry)
  - [What is a shadcn Registry?](#what-is-a-shadcn-registry)
  - [Contents](#contents)
  - [Component Libraries](#component-libraries)
    - [Production Ready](#production-ready)
    - [Beta/Experimental](#betaexperimental)
  - [Third-Party Registries](#third-party-registries)
  - [Development Tools](#development-tools)
  - [How to Use](#how-to-use)
    - [Adding a Custom Registry](#adding-a-custom-registry)
    - [Registry Requirements](#registry-requirements)
  - [Examples](#examples)
  - [Contributing](#contributing)
  - [License](#license)

## Component Libraries

<!-- IMPORT:registry/libraries/README.md -->
Libraries that implement the shadcn/ui registry format, allowing installation via `npx shadcn@latest add <component>`.

### Production Ready

- **BundUI** [🔗](https://bundui.io/) [📦](https://github.com/bundui/components) - TypeScript-compatible component library that supports shadcn/ui
- **FancyComponents** [🔗](https://www.fancycomponents.dev/) - Growing library of ready-to-use React components
- **OriginUI** [🔗](https://originui.com/) [📦](https://github.com/Origin-UI/originui) - Open-source collection of copy-and-paste components built with Tailwind CSS and React (500+ components)

### Beta/Experimental

- **PaceUI** [🔗](https://paceui.com/) [📦](https://github.com/paceui/paceui) - Animated components and design blocks with built-in interactivity
<!-- END IMPORT -->

## How to Use

### Adding a Custom Registry

To use a third-party registry in your project, configure your `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@custom": "https://registry.example.com/{name}.json"
  }
}
```

Then install components:

```bash
npx shadcn@latest add @custom/component-name
```

### Registry Requirements

For a library to be included in this list, it must:

- ✅ Implement the shadcn/ui registry specification
- ✅ Support installation via `npx shadcn@latest add`
- ✅ Provide a valid `components.json` configuration
- ✅ Include proper component metadata and dependencies
- ✅ Maintain compatibility with latest shadcn/ui standards

## Examples

Here are some examples of established shadcn registries:

- **OriginUI** - Copy-paste components with 25+ categories
- **BundUI** - TypeScript-compatible component library
- **PaceUI** - Animated components and design blocks
- **FancyComponents** - Ready-to-use React components

## Contributing

Please read the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

MIT
