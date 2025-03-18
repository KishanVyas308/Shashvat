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
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Shashvat Enterprise",
          "url": "https://www.shashvatEnterprise.com",
          "logo": "https://yourwebsite.com/logo.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot No 3016, GIDC-Phase3, Dared",
            "addressLocality": "Jamnagar",
            "addressRegion": "Gujarat",
            "postalCode": "361004",
            "addressCountry": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98250 49059",
            "contactType": "customer service"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
