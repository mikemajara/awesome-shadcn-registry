#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REGISTRY_DIR = path.join(__dirname, '../registry');
const LIBRARIES_DIR = path.join(REGISTRY_DIR, 'libraries');
const MAIN_README = path.join(__dirname, '../README.md');
const LIBRARIES_README = path.join(LIBRARIES_DIR, 'README.md');

function readLibraryEntries() {
  const libraries = [];
  
  if (!fs.existsSync(LIBRARIES_DIR)) {
    console.error('❌ Libraries directory not found');
    return libraries;
  }
  
  const entries = fs.readdirSync(LIBRARIES_DIR);
  
  entries.forEach(entry => {
    const indexPath = path.join(LIBRARIES_DIR, entry, 'index.json');
    if (fs.existsSync(indexPath)) {
      try {
        const content = fs.readFileSync(indexPath, 'utf8');
        const library = JSON.parse(content);
        libraries.push(library);
      } catch (error) {
        console.error(`❌ Error reading ${indexPath}: ${error.message}`);
      }
    }
  });
  
  return libraries;
}

function generateLibraryMarkdown(library) {
  const links = [];
  
  if (library.homepage) {
    links.push(`[🔗](${library.homepage})`);
  }
  
  if (library.repository) {
    links.push(`[📦](${library.repository})`);
  }
  
  const linkString = links.length > 0 ? ` ${links.join(' ')}` : '';
  const componentCount = library.componentCount ? ` (${library.componentCount} components)` : '';
  
  return `- **${library.name}**${linkString} - ${library.description}${componentCount}`;
}

function generateLibrariesReadme(libraries) {
  const grouped = {
    production: libraries.filter(lib => lib.status === 'production'),
    beta: libraries.filter(lib => lib.status === 'beta' || lib.status === 'alpha'),
  };
  
  let content = 'Libraries that implement the shadcn/ui registry format, allowing installation via `npx shadcn@latest add <component>`.\n\n';
  
  if (grouped.production.length > 0) {
    content += '### Production Ready\n\n';
    grouped.production
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(lib => {
        content += generateLibraryMarkdown(lib) + '\n';
      });
    content += '\n';
  }
  
  if (grouped.beta.length > 0) {
    content += '### Beta/Experimental\n\n';
    grouped.beta
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(lib => {
        content += generateLibraryMarkdown(lib) + '\n';
      });
    content += '\n';
  }
  
  return content.trim();
}

function updateMainReadme() {
  if (!fs.existsSync(MAIN_README)) {
    console.error('❌ Main README.md not found');
    return false;
  }
  
  if (!fs.existsSync(LIBRARIES_README)) {
    console.error('❌ Libraries README.md not found');
    return false;
  }
  
  const mainContent = fs.readFileSync(MAIN_README, 'utf8');
  const librariesContent = fs.readFileSync(LIBRARIES_README, 'utf8');
  
  // Replace content between import markers, preserving the marker for future runs
  const importMarker = '<!-- IMPORT:registry/libraries/README.md -->';
  const startMarker = importMarker;
  const endMarker = '<!-- END IMPORT -->';
  
  let updatedContent;
  if (mainContent.includes(startMarker)) {
    if (mainContent.includes(endMarker)) {
      // Replace content between markers
      const beforeMarker = mainContent.split(startMarker)[0];
      const afterMarker = mainContent.split(endMarker)[1];
      updatedContent = beforeMarker + startMarker + '\n' + librariesContent + '\n' + endMarker + afterMarker;
    } else {
      // First time - add end marker
      updatedContent = mainContent.replace(startMarker, startMarker + '\n' + librariesContent + '\n' + endMarker);
    }
  } else {
    console.warn('⚠️  Import marker not found in main README.md');
    return false;
  }
  
  
  fs.writeFileSync(MAIN_README, updatedContent);
  return true;
}

function generateReadme() {
  console.log('📝 Generating README from registry entries...\n');
  
  // Read all library entries
  const libraries = readLibraryEntries();
  console.log(`📊 Found ${libraries.length} libraries`);
  
  if (libraries.length === 0) {
    console.warn('⚠️  No libraries found to generate README');
    return;
  }
  
  // Generate libraries README
  const librariesMarkdown = generateLibrariesReadme(libraries);
  fs.writeFileSync(LIBRARIES_README, librariesMarkdown);
  console.log(`✅ Generated registry/libraries/README.md`);
  
  // Update main README
  if (updateMainReadme()) {
    console.log(`✅ Updated main README.md`);
  }
  
  console.log('\n🎉 README generation complete!');
}

generateReadme();