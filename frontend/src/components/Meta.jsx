import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Farmer's Market",
  description: "We sell the best quality products for cheap",
  keywords: "vegetables, cheap vegetables, buy vegetables",
};

export default Meta;
