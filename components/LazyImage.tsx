import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};
//Le agrego los tipos de los elementos img nativos
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
//uno los tipos nativos con los del componente
type Props = LazyImageProps & ImageNative;

export const LazyImage = ({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  //Uso useRef para referencian un nodo del DOM
  const node = useRef<HTMLImageElement>(null);
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );
  //uso un useEffect para efectos en los componentes, ejemplo: traer datos de una API, actualizar el DOM
  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }
    // creo un observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        //Cada vez que la imagen queda fuera de la parte visible, la asigno al source
        setCurrentSrc(src);
        observer.disconnect();
        setIsLazyLoaded(true);
        if (typeof onLazyLoad === "function") {
          onLazyLoad(node.current);
        }
      });
    });
    //Le digo al observador que observe el nodo de referencia
    if (node.current) {
      observer.observe(node.current);
    }
    //función que desmonta el observador
    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad, isLazyLoaded]);
  //El segundo parámetro controla cuando se ejecuta. Si el array esta vacío se ejecuta en el primer render, si tiene props o states se ejecuta cuando estos valores cambian. Image se actualiza cada vez que hago click en el botón add new fox.

  return (
    <img
      // asigno el hook useRef a este nodo del DOM
      ref={node}
      // el src se completa sin problema mientras la imagen esta en la pantalla, luego se agrega cuandoel observador accede al lugar donde debe estar caragada la foto
      src={currentSrc}
      {...imgProps}
    />
  );
};
