#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const REGISTRY_DIR = path.join(__dirname, "../registry")
const ROOT_REGISTRY_FILE = path.join(__dirname, "../registry.json")
const LIBRARIES_DIR = path.join(REGISTRY_DIR, "libraries")
const MAIN_README = path.join(__dirname, "../README.md")
const LIBRARIES_README = path.join(LIBRARIES_DIR, "README.md")

function readLibraryEntries() {
  // Prefer new single-file registry.json if present
  if (fs.existsSync(ROOT_REGISTRY_FILE)) {
    try {
      const content = fs.readFileSync(ROOT_REGISTRY_FILE, "utf8")
      const root = JSON.parse(content)
      if (!Array.isArray(root.libraries)) {
        console.error(`❌ ${ROOT_REGISTRY_FILE}: 'libraries' must be an array`)
        return []
      }
      return root.libraries
    } catch (error) {
      console.error(`❌ Error reading ${ROOT_REGISTRY_FILE}: ${error.message}`)
      return []
    }
  }

  // Legacy folder-based format fallback (if the directory exists)
  const libraries = []
  if (!fs.existsSync(LIBRARIES_DIR)) {
    return libraries
  }
  const entries = fs.readdirSync(LIBRARIES_DIR)
  entries.forEach((entry) => {
    const indexPath = path.join(LIBRARIES_DIR, entry, "index.json")
    if (fs.existsSync(indexPath)) {
      try {
        const content = fs.readFileSync(indexPath, "utf8")
        const library = JSON.parse(content)
        libraries.push(library)
      } catch (error) {
        console.error(`❌ Error reading ${indexPath}: ${error.message}`)
      }
    }
  })
  return libraries
}

function generateLibraryMarkdown(library) {
  const links = []

  // Build repository link using HTML anchor to open in a new tab
  if (library.repository) {
    links.push(
      `<a href="${library.repository}" target="_blank" rel="noopener noreferrer">📦</a>`
    )
  }

  const linkString = links.length > 0 ? ` ${links.join(" ")}` : ""
  const componentCount = library.componentCount
    ? ` (${library.componentCount} components)`
    : ""

  // Make bold name the website link (if homepage exists), otherwise just bold text
  const nameHtml = library.homepage
    ? `<a href="${library.homepage}" target="_blank" rel="noopener noreferrer"><strong>${library.name}</strong></a>`
    : `<strong>${library.name}</strong>`

  return `- ${nameHtml}${linkString} - ${library.description}${componentCount}`
}

function generateLibrariesReadme(libraries) {
  const grouped = {
    production: libraries.filter((lib) => lib.status === "production"),
    beta: libraries.filter(
      (lib) => lib.status === "beta" || lib.status === "alpha"
    ),
  }

  let content =
    "Libraries that implement the shadcn/ui registry format, allowing installation via `npx shadcn@latest add <component>`.\n\n"

  if (grouped.production.length > 0) {
    content += "### Production Ready\n\n"
    grouped.production
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((lib) => {
        content += generateLibraryMarkdown(lib) + "\n"
      })
    content += "\n"
  }

  if (grouped.beta.length > 0) {
    content += "### Beta/Experimental\n\n"
    grouped.beta
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((lib) => {
        content += generateLibraryMarkdown(lib) + "\n"
      })
    content += "\n"
  }

  return content.trim()
}

function updateMainReadme(librariesContent) {
  if (!fs.existsSync(MAIN_README)) {
    console.error("❌ Main README.md not found")
    return false
  }
  const mainContent = fs.readFileSync(MAIN_README, "utf8")

  // Replace content between import markers, preserving the marker for future runs
  const importMarker = "<!-- IMPORT:registry/libraries/README.md -->"
  const startMarker = importMarker
  const endMarker = "<!-- END IMPORT -->"

  let updatedContent
  if (mainContent.includes(startMarker)) {
    if (mainContent.includes(endMarker)) {
      // Replace content between markers
      const beforeMarker = mainContent.split(startMarker)[0]
      const afterMarker = mainContent.split(endMarker)[1]
      updatedContent =
        beforeMarker +
        startMarker +
        "\n" +
        librariesContent +
        "\n" +
        endMarker +
        afterMarker
    } else {
      // First time - add end marker
      updatedContent = mainContent.replace(
        startMarker,
        startMarker + "\n" + librariesContent + "\n" + endMarker
      )
    }
  } else {
    console.warn("⚠️  Import marker not found in main README.md")
    return false
  }

  fs.writeFileSync(MAIN_README, updatedContent)
  return true
}

function generateReadme() {
  console.log("📝 Generating README from registry entries...\n")

  // Read all library entries
  const libraries = readLibraryEntries()
  console.log(`📊 Found ${libraries.length} libraries`)

  if (libraries.length === 0) {
    console.warn("⚠️  No libraries found to generate README")
    return
  }

  // Generate libraries README
  const librariesMarkdown = generateLibrariesReadme(libraries)
  // Update main README directly
  if (updateMainReadme(librariesMarkdown)) {
    console.log(`✅ Updated main README.md`)
  }

  console.log("\n🎉 README generation complete!")
}

generateReadme()
