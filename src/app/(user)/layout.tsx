
import type { Metadata } from "next";
import "../globals.css";
import PageLoader from "@/components/ui-elements/loader/page-loader";
import Navbar from "@/components/Layouts/user/nabar";
import Footer from "@/components/Layouts/user/footer";
import { getHomePageData } from "@/api/api";
import { ToasterProvider } from "@/helpers/toaster";
import WhatsAppWidget from "@/components/user/whatsapp-button";

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: "Mrone Properties | Luxury Real Estate in Dubai",
  description:
    "Discover unparalleled luxury real estate opportunities in Dubai with Mrone Properties. Premium villas, apartments, and commercial properties in prime locations.",
  keywords:
    "Dubai real estate, luxury properties, Dubai villas, Dubai apartments, Mrone Properties, property investment",
  authors: [{ name: "Mrone Properties" }],
  category: "Real Estate",
  alternates: {
    canonical: "https://mrone.properties",
  },
  openGraph: {
    title: "Mrone Properties | Luxury Real Estate in Dubai",
    description:
      "Discover unparalleled luxury real estate opportunities in Dubai with Mrone Properties.",
    url: "https://mrone.properties",
    siteName: "Mrone Properties",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "../../favicon.ico",
        width: 1200,
        height: 630,
        alt: "MRONE Properties Dubai",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  verification: {
    // Add your verification codes here
    google: " ",
  },
};

// Set dynamic revalidation time for ISR
export const revalidate = 1;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homePageData = await getHomePageData();

  const communities = homePageData?.community || [];
  const properties = homePageData?.properties || [];
  const socialMediaLinks = homePageData?.socialMediaLinks || [];

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Favicons for various devices */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../../favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../../favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../../favicon.ico"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Mrone Properties",
              image: "https://mrone.properties/images/logo.png",
              url: "https://mrone.properties",
              description: "Luxury real estate agency in Dubai",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971509902467",
                contactType: "Customer Service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
      </head>
      <body className="font-barlow">
        {/* <PageLoader> */}
          <ToasterProvider />

          <Navbar />
          <main>{children}</main>
          <Footer
            communities={communities}
            properties={properties}
            socialMedia={socialMediaLinks}
          />
          <div className="relative z-40">
            <WhatsAppWidget />
          </div>
        {/* </PageLoader> */}
      </body>
    </html>
  );
}
