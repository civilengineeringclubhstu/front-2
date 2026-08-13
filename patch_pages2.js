const fs = require('fs');

// Patch blog page
let blogCode = fs.readFileSync('app/content/blog/page.tsx', 'utf8');
blogCode = blogCode.replace(/toLocaleDateString\(undefined, \{ year: 'numeric', month: 'short', day: 'numeric' \)\}\)\}/g, "toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })");
blogCode = blogCode.replace("const title = title;", "const title = post.title;");
blogCode = blogCode.replace("        ))}      </div>", "        )})}      </div>");
fs.writeFileSync('app/content/blog/page.tsx', blogCode);

// Patch upcoming page
let upCode = fs.readFileSync('app/events/upcoming/page.tsx', 'utf8');
upCode = upCode.replace(/toLocaleDateString\(undefined, \{ year: 'numeric', month: 'long', day: 'numeric' \)\}\)\}/g, "toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })");
upCode = upCode.replace("const desc = descriptionMarkdown || '';", "const desc = event.descriptionMarkdown || '';");
upCode = upCode.replace("const tStr = tStr || 'TBA';", "const tStr = event.time || 'TBA';");
upCode = upCode.replace("        ))}      </div>", "        )})}      </div>");
fs.writeFileSync('app/events/upcoming/page.tsx', upCode);

