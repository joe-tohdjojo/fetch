import { LoginForm } from '@/components/LoginForm';

/**
 * Login page component that displays the login form
 * @returns {JSX.Element} Login page component
 */
export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
