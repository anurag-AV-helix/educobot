import * as React from "react";

function Icon_download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 25" fill="none" {...props}>
      <rect x={4} y={18.5} width={16} height={2} rx={1} fill="#212B36" />
      <rect
        x={4}
        y={20.5}
        width={4}
        height={2}
        rx={1}
        transform="rotate(-90 4 20.5)"
        fill="#212B36"
      />
      <rect
        x={18}
        y={20.5}
        width={4}
        height={2}
        rx={1}
        transform="rotate(-90 18 20.5)"
        fill="#212B36"
      />
      <path
        d="M12 15.5a1 1 0 01-.58-.18l-4-2.82a1 1 0 111.16-1.63L12 13.26l3.4-2.56a1 1 0 111.2 1.6l-4 3a1 1 0 01-.6.2z"
        fill="#212B36"
      />
      <path
        d="M12 13.5a1 1 0 01-1-1v-8a1 1 0 112 0v8a1 1 0 01-1 1z"
        fill="#212B36"
      />
    </svg>
  );
}

const MemoIcon_download = React.memo(Icon_download);
export default MemoIcon_download;
