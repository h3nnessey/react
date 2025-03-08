import { redirect } from 'react-router';

export async function loader() {
  return redirect('/not-found');
}

export default function Redirect() {
  return null;
}
