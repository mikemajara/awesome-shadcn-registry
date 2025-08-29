#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REGISTRY_DIR = path.join(__dirname, '../registry');
const REQUIRED_FIELDS = ['name', 'description', 'author', 'category', 'version', 'shadcnCompatible'];
const LIBRARY_REQUIRED_FIELDS = ['registryUrl', 'installCommand'];
const REGISTRY_REQUIRED_FIELDS = ['registryUrl', 'installCommand'];

function validateRegistryEntry(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const entry = JSON.parse(content);
    
    // Check basic required fields
    const missingFields = REQUIRED_FIELDS.filter(field => !entry[field]);
    if (missingFields.length > 0) {
      console.error(`❌ ${filePath}: Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Validate category
    const validCategories = ['libraries', 'registries', 'tools'];
    if (!validCategories.includes(entry.category)) {
      console.error(`❌ ${filePath}: Invalid category '${entry.category}'. Must be one of: ${validCategories.join(', ')}`);
      return false;
    }
    
    // Validate shadcn compatibility
    if (entry.shadcnCompatible !== true) {
      console.error(`❌ ${filePath}: shadcnCompatible must be true for inclusion in this registry`);
      return false;
    }
    
    // Category-specific validation
    if (entry.category === 'libraries') {
      const missingLibraryFields = LIBRARY_REQUIRED_FIELDS.filter(field => !entry[field]);
      if (missingLibraryFields.length > 0) {
        console.error(`❌ ${filePath}: Missing required library fields: ${missingLibraryFields.join(', ')}`);
        return false;
      }
      
      // Validate status for libraries
      const validStatuses = ['production', 'beta', 'alpha'];
      if (entry.status && !validStatuses.includes(entry.status)) {
        console.error(`❌ ${filePath}: Invalid status '${entry.status}'. Must be one of: ${validStatuses.join(', ')}`);
        return false;
      }
    }
    
    if (entry.category === 'registries') {
      const missingRegistryFields = REGISTRY_REQUIRED_FIELDS.filter(field => !entry[field]);
      if (missingRegistryFields.length > 0) {
        console.error(`❌ ${filePath}: Missing required registry fields: ${missingRegistryFields.join(', ')}`);
        return false;
      }
    }
    
    // Validate URLs if present
    const urlFields = ['homepage', 'repository', 'registryUrl'];
    urlFields.forEach(field => {
      if (entry[field] && !isValidUrl(entry[field])) {
        console.error(`❌ ${filePath}: Invalid URL for field '${field}': ${entry[field]}`);
        return false;
      }
    });
    
    // Validate lastUpdated format (YYYY-MM-DD)
    if (entry.lastUpdated && !isValidDate(entry.lastUpdated)) {
      console.error(`❌ ${filePath}: Invalid lastUpdated format. Use YYYY-MM-DD format.`);
      return false;
    }
    
    console.log(`✅ ${filePath}: Valid`);
    return true;
  } catch (error) {
    console.error(`❌ ${filePath}: ${error.message}`);
    return false;
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && dateString === date.toISOString().split('T')[0];
}

function validateAllEntries() {
  console.log('🔍 Validating shadcn registry entries...\n');
  
  let isValid = true;
  const categories = ['libraries', 'registries', 'tools'];
  let totalEntries = 0;
  
  categories.forEach(category => {
    const categoryDir = path.join(REGISTRY_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      return;
    }
    
    const entries = fs.readdirSync(categoryDir);
    entries.forEach(entry => {
      const indexPath = path.join(categoryDir, entry, 'index.json');
      if (fs.existsSync(indexPath)) {
        totalEntries++;
        if (!validateRegistryEntry(indexPath)) {
          isValid = false;
        }
      }
    });
  });
  
  console.log(`\n📊 Validated ${totalEntries} registry entries`);
  
  if (isValid) {
    console.log('🎉 All shadcn registry entries are valid!');
  } else {
    console.log('❌ Some registry entries have validation errors.');
    process.exit(1);
  }
}

validateAllEntries();