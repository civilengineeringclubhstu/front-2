const fs = require('fs');

let code = fs.readFileSync('app/content/blog/[id]/page.tsx', 'utf8');

const oldImage = `{post.coverImageUrl && (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}`;

const newImage = `      <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-2xl">
        <Image
          src={post.coverImageUrl || \`https://picsum.photos/seed/\${post.id}/1200/600\`}
          alt={post.title}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      
      {post.description && (
        <p className="text-xl text-primary-light/80 dark:text-primary/80 mb-8 font-medium leading-relaxed">
          {post.description}
        </p>
      )}`;

code = code.replace(oldImage, newImage);
fs.writeFileSync('app/content/blog/[id]/page.tsx', code);
