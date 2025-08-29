# Awesome shadcn Registry

Curated component libraries that implement the for `shadcn` registry.

And hopefully start showing it off

```bash
npx shadcn@latest add <component>
```

<a href="https://ui.shadcn.com/docs/registry"><img alt="Shadcn Registry" src="https://img.shields.io/badge/registry-ready-green?style=flat-square&logo=shadcnui"></a>

## Component Libraries

<!-- IMPORT:registry/libraries/README.md -->

Libraries that implement the shadcn/ui registry format, allow installation via `npx shadcn@latest add <component>`.

### Production Ready

- **BundUI** [🔗](https://bundui.io/) [📦](https://github.com/bundui/components) - TypeScript-compatible component library that supports shadcn/ui
- **FancyComponents** [🔗](https://www.fancycomponents.dev/) - Growing library of ready-to-use React components
- **OriginUI** [🔗](https://originui.com/) [📦](https://github.com/Origin-UI/originui) - Open-source collection of copy-and-paste components built with Tailwind CSS and React (500+ components)
- **tweakcn** [🔗](https://tweakcn.com/) [📦](https://github.com/jnsahaj/tweakcn) - A visual no-code theme editor for shadcn/ui components and Tailwind CSS

### Beta/Experimental

- **PaceUI** [🔗](https://paceui.com/) [📦](https://github.com/paceui/paceui) - Animated components and design blocks with built-in interactivity
<!-- END IMPORT -->

## Quick Start

Use a custom registry by adding it to `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@custom": "https://registry.example.com/{name}.json"
  }
}
```

Install a component from that registry:

```bash
npx shadcn@latest add @custom/component-name
```

## Contributing

Please read the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

MIT
