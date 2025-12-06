import React from "react";
import Navbar from "../public-components/Navbar";

const PublicPagesLayout = ({ children }) => {
  return (
    <section className="public-pages-layoutmin-h-screen bg-gradient-to-r from-sidebar via-background to-sidebar">
      <Navbar />
      <main>{children}</main>
    </section>
  );
};

export default PublicPagesLayout;
