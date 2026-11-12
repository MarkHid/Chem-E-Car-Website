import React, { useState } from 'react';
import { UserRound } from 'lucide-react';

function Portrait({ member }) {
  const [failed, setFailed] = useState(false);
  if (!member.image || failed) {
    return <div className="member-placeholder" role="img" aria-label={`Photo to be added for ${member.name}`}>
      <UserRound size={36} strokeWidth={1} aria-hidden="true" />
      <span>{`// ADD PHOTO: ${member.name}`}</span>
    </div>;
  }
  return <img src={member.image} alt={`Portrait of ${member.name}, ${member.role}`}
    className="member-portrait w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    loading="lazy" onError={() => setFailed(true)} />;
}

export default function MemberPortrait({ member }) {
  return <Portrait key={`${member.name}:${member.image || 'unassigned'}`} member={member} />;
}
