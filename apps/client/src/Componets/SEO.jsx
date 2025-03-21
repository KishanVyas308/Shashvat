import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={window.location.href} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
