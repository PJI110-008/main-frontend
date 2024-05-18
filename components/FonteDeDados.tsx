"use client";
import Link from "next/link";

const FonteDeDados: (props: { fonte: string; url: string }) => JSX.Element = ({
  fonte,
  url,
}) => {
  return (
    <div className="mt-4 text-gray-500 text-sm text-center">
      <p>
        Fonte dos dados:
        <Link className="text-blue-500 hover:underline" target="_blank" href={url}>
          {fonte}
        </Link>
      </p>
    </div>
  );
};

export default FonteDeDados;
