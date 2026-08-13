const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// Fix syntax error if any
code = code.replace("              ); })}\n            </div>\n          </div>", "              ); })}\n            </div>\n          </div>");

fs.writeFileSync('app/page.tsx', code);
