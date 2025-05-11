'use client';

import React from 'react';

// Define TypeScript interfaces for the component props
interface PaymentStepProps {
  title: string;
  subtitle: string;
}

interface PaymentPlanProps {
  heading?: string;
  subheading?: string;
  steps: PaymentStepProps[];
  className?: string;
}

// Individual payment step component
const PaymentStep: React.FC<PaymentStepProps & { className?: string }> = ({ 
  title, 
  subtitle,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-xl md:text-3xl font-medium mb-1">{title}</h3>
      <p className="text-sm md:text-base text-gray-600">{subtitle}</p>
    </div>
  );
};

// Main payment plan component
const PaymentPlan: React.FC<PaymentPlanProps> = ({
  heading = "Attractive 80/20 Payment Plan",
  subheading = "FINANCIAL INFORMATION",
  steps = [
    { title: "70/30", subtitle: "Down Payment" },
    { title: "70%", subtitle: "Installments" },
    { title: "20%", subtitle: "Completion" }
  ],
  className = ''
}) => {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 py-8 md:py-16 ${className}`}>
      <div className="text-center">
        {subheading && (
          <p className="text-sm md:text-base uppercase tracking-wider text-gray-600 mb-2">
            {subheading}
          </p>
        )}
        
        {heading && (
          <h2 className="text-2xl md:text-4xl font-serif mb-12 md:mb-16">
            {heading}
          </h2>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          {steps.map((step, index) => (
            <PaymentStep 
              key={index}
              title={step.title}
              subtitle={step.subtitle}
              className={`w-full md:w-1/${steps.length}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;