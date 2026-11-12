import React from 'react';
import './AboutSubTeams.css';

const divisions = [
  {
    id: 'technical-teams',
    name: 'Technical Teams',
    teams: [
      ['ELECTRICAL', 'Circuit design, sensor integration, telemetry and onboard control electronics.'],
      ['STOPPING MECHANISM', 'Precision chemical reaction calibration and autonomous distance-stopping systems.'],
      ['MECHANICAL', 'Chassis architecture, drivetrain engineering, CAD modelling and vehicle fabrication.'],
      ['BATTERY', 'Electrochemical power cell development, safety containment and repeatable energy output.'],
    ],
  },
  {
    id: 'non-technical-teams',
    name: 'Non-Technical Teams',
    teams: [
      ['MEDIA', 'Visual storytelling, photography, branding and digital content across our channels.'],
      ['SPONSORSHIPS', 'Industry partnerships, grant acquisition and corporate relations supporting our builds.'],
      ['EVENTS', 'High school STEM outreach workshops, campus exhibitions and team operations.'],
    ],
  },
];

export default function AboutSubTeams() {
  return (
    <div className="subteam-divisions">
      {divisions.map(division => (
        <section key={division.id} aria-labelledby={division.id}>
          <h3 id={division.id} className={`subteam-division-label ${division.id}`}>
            {division.name}
          </h3>
          <dl className="subteam-list">
            {division.teams.map(([name, description]) => (
              <div key={name} className="subteam-row">
                <dt>{name}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
