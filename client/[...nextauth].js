import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    // Define authentication providers here
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Add your custom logic to validate credentials
        // For example, you can make an API call to your Node.js backend to validate the username and password
        const user = await yourCustomAuthenticationFunction(credentials.username, credentials.password);
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Customize the sign-in page URL
    signOut: '/auth/signout', // Customize the sign-out page URL
    error: '/auth/error', // Customize the error page URL
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, user) {
      // Customize the user session
      session.user.id = user.id; // You can add more user-related data to the session
      return Promise.resolve(session);
    },
  },
  events: {
    async signIn({ user, account, profile, email, credentials }) {
      // Handle sign-in events, e.g., log the user in
    },
  },
});
