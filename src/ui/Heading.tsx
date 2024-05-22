function Heading({ title, size }: { title: string; size?: string }) {
  return <h1 className={`${size} font-bold my-3 sm:mb-4`}>{title}</h1>;
}

export default Heading;
