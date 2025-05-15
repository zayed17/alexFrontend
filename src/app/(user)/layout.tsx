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
  title: "Inayath Property | Premium Real Estate in Dubai",
  description:
    "Explore premium real estate opportunities in Dubai with Inayath Property. Luxurious villas, apartments, and commercial properties in top locations.",
  keywords:
    "Dubai real estate, premium properties, Dubai villas, Dubai apartments, Inayath Property, property investment",
  authors: [{ name: "Inayath Property" }],
  category: "Real Estate",
  alternates: {
    canonical: "https://inayath.property",
  },
  openGraph: {
    title: "Inayath Property | Premium Real Estate in Dubai",
    description:
      "Explore premium real estate opportunities in Dubai with Inayath Property.",
    url: "https://inayath.property",
    siteName: "Inayath Property",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "../../favicon.ico",
        width: 1200,
        height: 630,
        alt: "Inayath Property Dubai",
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
              name: "Inayath Property",
              image: "https://inayath.property/images/logo.png",
              url: "https://inayath.property",
              description: "Premium real estate agency in Dubai",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "UAE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971509902468",
                contactType: "Customer Service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
      </head>
      <body className="font-archivo">
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