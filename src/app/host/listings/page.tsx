import type { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../../../components/host/Sidebar';
import Header from '../../../components/host/Header'
const Listings: NextPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>My Listings</title>
        <meta name="description" content="Air nb Host Listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Listings</h1>
          {/* listing componenent and other features are shown here */}
        </div>
      </div>
    </div>
  );
};
export default Listings;