"use client";

import { useState } from 'react';

const SERVICES = [
  {
    name: "Web Development",
    text: "Websites, e-commerce, SaaS, and custom software.",
  },
  {
    name: "Mobile Development",
    text: "Cross-platform applications and mobile products.",
  },
  {
    name: "Cloud & Deployment",
    text: "Deployment, cloud infrastructure, maintenance, and support.",
  },
  {
    name: "UI/UX Design",
    text: "User flows, interface design, prototypes, and handoff.",
  },
  {
    name: "Integrations",
    text: "API integrations, third-party services, and workflow automation.",
  },
  {
    name: "Digital Marketing",
    text: "Instagram profile setup, creative assets, flyers, and advertising support.",
  },
] as const;

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <div className="services" role="group" aria-label="Services">
      <p className="services-label">WHAT WE BUILD</p>
      <ul className="services-list">
        {SERVICES.map((service, index) => {
          const open = index === active;

          return (
            <li key={service.name} className="service" data-open={open}>
              <button
                type="button"
                id={`service-button-${index}`}
                className="service-button"
                aria-expanded={open}
                aria-controls={`service-panel-${index}`}
                onClick={() => setActive(index)}
              >
                <span className="service-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-name">{service.name}</span>
                <span className="service-mark" aria-hidden="true" />
              </button>
              <div
                id={`service-panel-${index}`}
                className="service-panel"
                role="group"
                aria-labelledby={`service-button-${index}`}
              >
                <div className="service-panel-inner">
                  <p>{service.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

