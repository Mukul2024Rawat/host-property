"use client";
import WithAuth from "@/components/withAuth";
import Layout from "../../../components/Layout";

const Dashboard = () => {
  return (
    <>
      <Layout />
    </>
  );
};

export default WithAuth(Dashboard);
