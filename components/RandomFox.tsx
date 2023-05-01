type Props = {
  image: string;
  alt: string;
};

export const RandomFox = ({ image, alt }: Props): JSX.Element => {
  return (
    <img
      src={image}
      className="h-auto col-span-6 col-start-4 my-4 border-2 border-yellow-800 rounded-lg shadow-lg justify-self-center shadow-yellow-900"
      alt={alt}
    />
  );
};
