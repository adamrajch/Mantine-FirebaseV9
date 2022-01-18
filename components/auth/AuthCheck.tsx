import Link from 'next/link';
import { useAuth } from '../../context/auth';

// Component's children only shown to logged-in users
export default function AuthCheck(props: any) {
  const { user } = useAuth();

  return user ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;
}
