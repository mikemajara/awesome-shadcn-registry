#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const REGISTRY_DIR = path.join(__dirname, "../registry")
const ROOT_REGISTRY_FILE = path.join(__dirname, "../registry.json")
const SCHEMA_DIR = path.join(__dirname, "../schemas")
const REQUIRED_FIELDS = [
  "name",
  "description",
  "author",
  "category",
  "version",
  "shadcnCompatible",
]
const LIBRARY_REQUIRED_FIELDS = ["registryUrl", "installCommand"]
const REGISTRY_REQUIRED_FIELDS = ["registryUrl", "installCommand"]

function validateSchemaReference(entry, filePath) {
  if (!entry.$schema) {
    console.warn(
      `⚠️  ${filePath}: Missing $schema reference. Add "$schema": "../../../schemas/library.json"`
    )
    return true // Warning, not error
  }

  const expectedSchema = "../../../schemas/library.json"
  if (entry.$schema !== expectedSchema) {
    console.warn(
      `⚠️  ${filePath}: Incorrect schema reference. Expected: ${expectedSchema}`
    )
    return true // Warning, not error
  }

  return true
}

function validateRegistryEntry(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const entry = JSON.parse(content)

    // Validate schema reference
    validateSchemaReference(entry, filePath)

    // Check basic required fields
    const missingFields = REQUIRED_FIELDS.filter((field) => !entry[field])
    if (missingFields.length > 0) {
      console.error(
        `❌ ${filePath}: Missing required fields: ${missingFields.join(", ")}`
      )
      return false
    }

    // Validate category
    const validCategories = ["libraries"]
    if (!validCategories.includes(entry.category)) {
      console.error(
        `❌ ${filePath}: Invalid category '${
          entry.category
        }'. Must be one of: ${validCategories.join(", ")}`
      )
      return false
    }

    // Validate shadcn compatibility
    if (entry.shadcnCompatible !== true) {
      console.error(
        `❌ ${filePath}: shadcnCompatible must be true for inclusion in this registry`
      )
      return false
    }

    // Category-specific validation
    if (entry.category === "libraries") {
      const missingLibraryFields = LIBRARY_REQUIRED_FIELDS.filter(
        (field) => !entry[field]
      )
      if (missingLibraryFields.length > 0) {
        console.error(
          `❌ ${filePath}: Missing required library fields: ${missingLibraryFields.join(
            ", "
          )}`
        )
        return false
      }

      // Validate status for libraries
      const validStatuses = ["production", "beta", "alpha"]
      if (entry.status && !validStatuses.includes(entry.status)) {
        console.error(
          `❌ ${filePath}: Invalid status '${
            entry.status
          }'. Must be one of: ${validStatuses.join(", ")}`
        )
        return false
      }
    }

    // Validate URLs if present
    const urlFields = ["homepage", "repository", "registryUrl"]
    urlFields.forEach((field) => {
      if (entry[field] && !isValidUrl(entry[field])) {
        console.error(
          `❌ ${filePath}: Invalid URL for field '${field}': ${entry[field]}`
        )
        return false
      }
    })

    // Validate lastUpdated format (YYYY-MM-DD)
    if (entry.lastUpdated && !isValidDate(entry.lastUpdated)) {
      console.error(
        `❌ ${filePath}: Invalid lastUpdated format. Use YYYY-MM-DD format.`
      )
      return false
    }

    console.log(`✅ ${filePath}: Valid`)
    return true
  } catch (error) {
    console.error(`❌ ${filePath}: ${error.message}`)
    return false
  }
}

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  const date = new Date(dateString)
  return (
    date instanceof Date &&
    !isNaN(date) &&
    dateString === date.toISOString().split("T")[0]
  )
}

function validateAllEntries() {
  console.log("🔍 Validating shadcn registry entries...\n")

  let isValid = true
  let totalEntries = 0

  if (fs.existsSync(ROOT_REGISTRY_FILE)) {
    // New single-file format
    try {
      const content = fs.readFileSync(ROOT_REGISTRY_FILE, "utf8")
      const root = JSON.parse(content)

      if (!Array.isArray(root.libraries)) {
        console.error(`❌ ${ROOT_REGISTRY_FILE}: 'libraries' must be an array`)
        process.exit(1)
      }

      const seenNames = new Set()
      const seenRegistryUrls = new Set()

      root.libraries.forEach((entry, idx) => {
        const context = `${ROOT_REGISTRY_FILE}#libraries[${idx}]`

        // Basic required fields
        const missingFields = REQUIRED_FIELDS.filter((field) => !entry[field])
        if (missingFields.length > 0) {
          console.error(
            `❌ ${context}: Missing required fields: ${missingFields.join(
              ", "
            )}`
          )
          isValid = false
        }

        // Category
        const validCategories = ["libraries"]
        if (entry.category && !validCategories.includes(entry.category)) {
          console.error(
            `❌ ${context}: Invalid category '${
              entry.category
            }'. Must be one of: ${validCategories.join(", ")}`
          )
          isValid = false
        }

        // shadcnCompatible
        if (entry.shadcnCompatible !== true) {
          console.error(
            `❌ ${context}: shadcnCompatible must be true for inclusion in this registry`
          )
          isValid = false
        }

        // Library-specific required fields
        const missingLibraryFields = LIBRARY_REQUIRED_FIELDS.filter(
          (field) => !entry[field]
        )
        if (missingLibraryFields.length > 0) {
          console.error(
            `❌ ${context}: Missing required library fields: ${missingLibraryFields.join(
              ", "
            )}`
          )
          isValid = false
        }

        // Status
        const validStatuses = ["production", "beta", "alpha"]
        if (entry.status && !validStatuses.includes(entry.status)) {
          console.error(
            `❌ ${context}: Invalid status '${
              entry.status
            }'. Must be one of: ${validStatuses.join(", ")}`
          )
          isValid = false
        }

        // URLs
        ;["homepage", "repository", "registryUrl"].forEach((field) => {
          if (entry[field] && !isValidUrl(entry[field])) {
            console.error(
              `❌ ${context}: Invalid URL for field '${field}': ${entry[field]}`
            )
            isValid = false
          }
        })

        // lastUpdated
        if (entry.lastUpdated && !isValidDate(entry.lastUpdated)) {
          console.error(
            `❌ ${context}: Invalid lastUpdated format. Use YYYY-MM-DD format.`
          )
          isValid = false
        }

        // Uniqueness
        if (entry.name) {
          if (seenNames.has(entry.name)) {
            console.error(
              `❌ ${context}: Duplicate library name '${entry.name}'`
            )
            isValid = false
          }
          seenNames.add(entry.name)
        }
        if (entry.registryUrl) {
          if (seenRegistryUrls.has(entry.registryUrl)) {
            console.error(
              `❌ ${context}: Duplicate registryUrl '${entry.registryUrl}'`
            )
            isValid = false
          }
          seenRegistryUrls.add(entry.registryUrl)
        }

        totalEntries++
      })

      console.log(`\n📊 Validated ${totalEntries} registry entries`)
    } catch (error) {
      console.error(`❌ ${ROOT_REGISTRY_FILE}: ${error.message}`)
      process.exit(1)
    }
  } else {
    // Legacy folder-based format
    const categories = ["libraries"]
    categories.forEach((category) => {
      const categoryDir = path.join(REGISTRY_DIR, category)
      if (!fs.existsSync(categoryDir)) {
        return
      }

      const entries = fs.readdirSync(categoryDir)
      entries.forEach((entry) => {
        const indexPath = path.join(categoryDir, entry, "index.json")
        if (fs.existsSync(indexPath)) {
          totalEntries++
          if (!validateRegistryEntry(indexPath)) {
            isValid = false
          }
        }
      })
    })

    console.log(`\n📊 Validated ${totalEntries} registry entries`)
  }

  if (isValid) {
    console.log("🎉 All shadcn registry entries are valid!")
  } else {
    console.log("❌ Some registry entries have validation errors.")
    process.exit(1)
  }
}

validateAllEntries()
