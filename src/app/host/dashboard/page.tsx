import type { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../../../components/host/Sidebar';
import Header from '../../../components/host/Header'
import Dashboard from '../../../components/host/Dashboard'
const HostDashboard: NextPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>Host Dashboard</title>
        <meta name="description" content="Air nb Host Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};
export default HostDashboard;