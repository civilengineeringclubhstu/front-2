const fs = require('fs');

let code = fs.readFileSync('app/content/blog/[id]/page.tsx', 'utf8');

const oldDesc = `{post.description && (
        <p className="text-xl text-primary-light/80 dark:text-primary/80 mb-8 font-medium leading-relaxed">
          {post.description}
        </p>
      )}`;

const newDesc = `{post.description ? (
        <p className="text-xl text-primary-light/80 dark:text-primary/80 mb-8 font-medium leading-relaxed">
          {post.description}
        </p>
      ) : (
        post.contentMarkdown && (
          <p className="text-xl text-primary-light/80 dark:text-primary/80 mb-8 font-medium leading-relaxed">
            {post.contentMarkdown.replace(/<[^>]+>/g, '').substring(0, 200)}...
          </p>
        )
      )}`;

code = code.replace(oldDesc, newDesc);
fs.writeFileSync('app/content/blog/[id]/page.tsx', code);
