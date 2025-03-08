import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', './routes/main.tsx', [route('/:id', './routes/details.tsx')]),
  route('/not-found', './routes/not-found.tsx'),
  route('/*', './routes/redirect.tsx'),
] satisfies RouteConfig;
