const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace("              ))}\n            </div>", "              ); })}\n            </div>");
fs.writeFileSync('app/page.tsx', code);
