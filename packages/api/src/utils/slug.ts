import { nanoid } from 'nanoid';

function generatePostSlug(title: string) {
  return nanoid(5) + '-' + title.replace(/[^a-z ]/g, '').replace(/ +/g, '-');
}

export { generatePostSlug };
