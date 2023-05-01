type Props = {
  image: string;
  alt: string;
};

export const RandomFox = ({ image, alt }: Props): JSX.Element => {
  return (
    <img
      src={image}
      className="w-4/5 h-auto col-span-4 col-start-5 my-4 border-2 border-yellow-800 rounded-lg shadow-lg justify-self-center shadow-yellow-900"
      alt={alt}
    />
  );
};
