import React from 'react';

export const EnhancedCrmSection = ({ leads, updateLeadStatus }) => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg">
      <h4 className="text-lg font-semibold text-[#F3E3C3] mb-4">Enhanced CRM Tools</h4>
      <p className="text-[#F3E3C3]/70 mb-4">Advanced CRM features for lead management</p>
      <div className="text-[#F3E3C3]/60">
        <p>• Lead scoring and qualification</p>
        <p>• Automated follow-up sequences</p>
        <p>• Advanced reporting and analytics</p>
        <p>• Integration with photography workflow</p>
      </div>
    </div>
  );
};
