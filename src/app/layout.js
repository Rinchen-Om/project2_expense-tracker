import './globals.css';
import { Inter, Roboto, Montserrat } from 'next/font/google';
import Providers from './providers';
import CommonLayout from './components/CommonLayout';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses with ease',
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} ${roboto.className} ${montserrat.className}`}>
        <Providers>
          <div className="app-root">
            {isLogin ? (
              <main style={{ flex: 1 }}>{children}</main>
            ) : (
              <CommonLayout>
                <main style={{ flex: 1 }}>{children}</main>
              </CommonLayout>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
