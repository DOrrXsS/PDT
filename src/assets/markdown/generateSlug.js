import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = fs.readdirSync("src/assets/markdown");

const posts = files.map(filename => {
    if (filename.match('.md')) {
        const slug = filename.replace('.md', '');

        const markdownWithMeta = fs.readFileSync(
            path.join(__dirname, filename),
            'utf-8'
        )

        const { data: frontmatter } = matter(markdownWithMeta);
        return {
            slug,
            frontmatter: { ...frontmatter }
        }
    }
}).filter(obj=>obj?true:false);

const posts_texts = JSON.stringify(posts);

fs.writeFileSync('src/assets/markdown/index.json', posts_texts,
    {
        encoding: 'utf-8'
    },
    (err) => {console.log(err)}
);

console.log("posts index updated")


