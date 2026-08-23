import { next } from '@vercel/functions';

const HOST_REDIRECTS: Record<string, string> = {
  'blog.ewastekochi.com': 'https://www.ewastekochi.com/blog/',
  'wiki.ewastekochi.com': 'https://www.ewastekochi.com/blog/',
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const host = url.hostname;

  const fixedDestination = HOST_REDIRECTS[host];
  if (fixedDestination) {
    return Response.redirect(fixedDestination, 301);
  }

  if (host === 'ewastekochi.com') {
    return Response.redirect(
      `https://www.ewastekochi.com${url.pathname}${url.search}`,
      301,
    );
  }

  return next();
}
