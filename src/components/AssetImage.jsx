import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';

function BoundImage({ src, alt = '', className = '', loading = 'lazy', placeholderLabel = alt, kind = 'photo', onError, width, height, ...props }) {
  const [failed, setFailed] = useState(false);
  const label = placeholderLabel || (kind === 'logo' ? 'Partner logo' : 'Image');

  if (!src || failed) {
    return (
      <span
        className={`image-placeholder ${className}`}
        role="img"
        aria-label={`${label} — ${kind === 'logo' ? 'logo' : 'photo'} to be added`}
      >
        <ImagePlus size={24} strokeWidth={1.25} aria-hidden="true" />
        <span className="image-placeholder-title">{kind === 'logo' ? 'Logo placeholder' : 'Photo placeholder'}</span>
        <span className="image-placeholder-label">{label}</span>
      </span>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      onError={event => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}

export default function AssetImage(props) {
  // A new path starts a fresh load, including after a previous path failed.
  return <BoundImage key={props.src || 'unassigned'} {...props} />;
}
