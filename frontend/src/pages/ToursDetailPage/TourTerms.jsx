import React, { useState } from 'react';

const TourTerms = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const sections = [
    {
      title: "Children's Policy",
      subsections: [
        {
          name: "1. General Regulations:",
          items: [
            "One child is allowed per two adults.",
            "For the second child onwards, the price will be as per the age group regulations (listed below).",
            "Children sleep in the same bed with their parents. If a separate bed is required: Adult price applies.",
            "Any expenses outside the program (if any) will be borne by the family."
          ]
        },
        {
          name: "2. Age Regulations:",
          items: [
            "Children under 2 years old: Price as shown on the website, includes airfare, no separate seat, sleeps with parents.",
            "Children from 2 to 11 years old: Price as shown on the website, includes all services in the program. Sleeps with parents. From the second child onwards: 100% adult price applies.",
            "Children 12 years and older: Adult price applies.",
            "In the case of only one adult traveling with one child (under 12 years old), the child will be charged the adult fare to ensure service as per regulations."
          ]
        },
        {
          name: "Required Documents for the Tour",
          items: [
            "Original passport and other necessary documents",
            "Children must be accompanied by a parent or guardian over 18 years old; a valid authorization letter is required if accompanied by a guardian."
          ]
        }
      ]
    },
    {
      title: "Cancellation & Change Policy",
      items: [
        "Cancellation from the time of registration until 22 days prior: Cancellation fee is 2,000,000 VND",
        "Cancellation 15-21 days prior to departure: Cancellation fee is 50% of the tour price.",
        "Cancellation 7-14 days prior to departure: Cancellation fee is 70% of the tour price.",
        "After the above period: 100% of the total tour price.",
        "In the event your visa application is rejected, your deposit will be fully refunded (except in cases of intentional or uncooperative refusal, where a cancellation fee of VND 2,000,000 per person will apply).",
        "Cancellation/change requests are recorded during business hours and calculated on a business day basis (excluding Saturdays, Sundays, and public holidays). Requests submitted outside business hours will be processed from the beginning of the next business day.",
        "Please send your cancellation request via email or the company's official contact channels for confirmation. Notifications via phone will not be considered valid grounds for cancellation.",
        "If you cancel the tour after your visa has been issued, the company will proceed with the visa cancellation procedure as per regulations."
      ]
    },
    {
      title: "Visa Information",
      subsections: [
        {
          name: "Documents required for visa application:",
          items: [
            "Passport valid for more than 6 months from the end date of the tour. Clear scan/photo, showing all information.",
            "If your passport does not have a place of birth section, please scan/photograph your place of birth note or both sides of your original citizen ID card.",
            "A recent passport-sized photo with a white background (clearly showing facial features: forehead, ears, eyebrows; no glasses, no earrings, no showing teeth when smiling; photo must not be the same as the passport photo).",
            "Complete the Taiwan visa application form as per template."
          ]
        },
        {
          name: "Proof of financial means:",
          items: [
            "Bank statement or savings account with a minimum balance of 50 million VND as required by the Consulate.",
            "Bank statement for the last 6 months.",
            "Notarized copy of land ownership certificate or vehicle registration (if applicable)."
          ]
        },
        {
          name: "Proof of employment (one of the following):",
          items: [
            "Employment contract / Appointment letter",
            "Business license (for business owners)",
            "Retirement certificate",
            "Student/school enrollment certificate"
          ]
        },
        {
          name: "Note regarding residency status:",
          items: [
            "Customers holding dual citizenship, a travel document, or a special residency status must inform us upon registration and provide all relevant documents.",
            "Customers with only a green card but no longer possessing a valid Vietnamese passport will not be eligible to register for tours to a third country.",
            "Overseas Vietnamese or foreign nationals with a valid visa to enter Vietnam must bring it with them to the tour.",
            "In case of using an ABTC (APEC), official passport, diplomatic passport, or self-applying for a visa, please inform us in advance for appropriate advice.",
            "Visa applications may be rejected or delayed by the competent authority; any resulting costs will be handled according to tour regulations. In case of changes to visa policies or fees, the costs will be updated according to the new regulations."
          ]
        }
      ]
    },
    {
      title: "Tour Participation Requirements",
      subsections: [
        {
          name: "Age & Health",
          items: [
            "This tour is for guests aged 12–69.",
            "Guests aged 70–75 and above must provide a health certificate issued by an authorized medical facility and be accompanied by a family member under 60 years old.",
            "Pregnant guests must inform us upon registration; a doctor's opinion is required before participating in the tour.",
            "Pregnant guests who are 5 months or more into their pregnancy are not accepted for safety reasons.",
            "Guests must ensure they are in good health to participate in the tour activities. If you have any special health conditions, please inform our consultant before booking."
          ]
        },
        {
          name: "Group Regulations:",
          items: [
            "The program may adjust the order of visits depending on the actual situation, but all points will still be covered.",
            "The tour departs when there are at least 15 adult guests. If the required number of participants is not met, the company will notify you and renegotiate the departure date."
          ]
        }
      ]
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        onClick={handleToggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#180B51',
            margin: 0,
          }}
        >
          Terms & Notes
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280',
            transition: 'transform 0.4s ease-in-out',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s ease-in-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {sections.map((section, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ color: '#765FDD', margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {section.title}
                </h3>
                
                {section.items && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', color: '#4B5563', lineHeight: '1.6' }}>
                        <span style={{ flexShrink: 0 }}>-</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.subsections && section.subsections.map((sub, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#374151' }}>
                      {sub.name}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {sub.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem' }}>
                          <span style={{ flexShrink: 0 }}>-</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourTerms;