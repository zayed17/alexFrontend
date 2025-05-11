import React from "react";
import ContactForm from "./contact-form";

export const revalidate = 1

function page() {
  return (
    <>
      <main className="pt-20">
        <ContactForm />
      </main>
    </>
  );
}

export default page;
