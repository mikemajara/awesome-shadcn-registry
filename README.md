# Awesome shadcn Registry

Curated list of shadcn/ui-compatible registries and component libraries.

<a href="https://ui.shadcn.com/docs/registry"><img alt="Shadcn Registry" src="https://img.shields.io/badge/registry-ready-green?style=flat-square&logo=shadcnui"></a>

## Component Libraries

<!-- IMPORT:registry/libraries/README.md -->
Libraries that implement the shadcn/ui registry format, allowing installation via `npx shadcn@latest add <component>`.

### Production Ready

- **AI Elements** [🔗](https://ai-elements.vercel.app/) [📦](https://github.com/vercel/ai-elements) - A collection of UI components for building AI-powered applications.
- **BundUI** [🔗](https://bundui.io/) [📦](https://github.com/bundui/components) - TypeScript-compatible component library that supports shadcn/ui
- **CopilotKit** [🔗](https://www.copilotkit.ai/) [📦](https://github.com/CopilotKit/CopilotKit) - React UI and infrastructure for AI copilots and chatbots.
- **FancyComponents** [🔗](https://www.fancycomponents.dev/) - Growing library of ready-to-use React components
- **IntentUI** [📦](https://github.com/irsyadadl/intentui) - Modern React UI components.
- **Kibo UI** [🔗](https://www.kibo-ui.com/) [📦](https://github.com/haydenbleasel/kibo) - A collection of UI components for building AI-powered applications.
- **Motion Primitives** [🔗](https://motion-primitives.com/) [📦](https://github.com/ibelick/motion-primitives) - UI kit to create beautiful, animated interfaces quickly. Customizable and open-source.
- **OriginUI** [🔗](https://originui.com/) [📦](https://github.com/Origin-UI/originui) - Open-source collection of copy-and-paste components built with Tailwind CSS and React (500+ components)
- **PaceUI** [🔗](https://paceui.com/) [📦](https://github.com/paceui/paceui) - Animated components and design blocks with built-in interactivity
- **Prompt Kit** [🔗](https://prompt-kit.com/) [📦](https://github.com/ibelick/prompt-kit) - Core building blocks for AI applications. High-quality, accessible, and customizable components for AI interfaces.
- **ReUI** [📦](https://github.com/keenthemes/reui) - Modern UI components by KeenThemes.
- **shadcn/ui** [🔗](https://ui.shadcn.com/) [📦](https://github.com/shadcn-ui/ui) - Beautifully-designed, accessible components and a code registry for modern web apps.
- **Supabase** [🔗](https://supabase.com/ui) [📦](https://github.com/supabase/supabase) - The Postgres development platform for web, mobile, and AI apps.
- **tweakcn** [🔗](https://tweakcn.com/) [📦](https://github.com/jnsahaj/tweakcn) - A visual no-code theme editor for shadcn/ui components and Tailwind CSS

### Beta/Experimental

- **Agents Kit** [🔗](https://agents-ui.github.io/agents-kit/) [📦](https://github.com/agents-ui/agents-kit) - Ready-made components for your AI agents.
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

## Contributing

Please read the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.

**TL;DR**

1. Fork the repo
2. Add a library object to `registry.json` under the `libraries` array
3. `git commit -m "add: awesome library"
4. Push and PR

## License

MIT
